-- New catalog value; no records or policies are removed.
ALTER TYPE public."MasterDataType" ADD VALUE IF NOT EXISTS 'PROCUREMENT_CODE';

-- One transaction per confirmed operation. RLS remains in force.
CREATE OR REPLACE FUNCTION public.inventory_manage(p_scope text, p_action text, p_ids text[])
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE item record; before_value jsonb; after_value jsonb; store_id text; affected integer := 0;
BEGIN
  IF NOT public.is_sub_asms_allowed() THEN RAISE EXCEPTION 'Không có quyền truy cập.'; END IF;
  IF p_scope NOT IN ('MAIN','SUB') OR p_action NOT IN ('RESET','DELETE') OR p_scope IS NULL OR p_action IS NULL THEN
    RAISE EXCEPTION 'Phạm vi hoặc thao tác không hợp lệ.';
  END IF;
  IF coalesce(array_length(p_ids,1),0)=0 THEN RAISE EXCEPTION 'Chọn ít nhất một tài sản.'; END IF;
  IF p_scope='MAIN' THEN
    PERFORM 1 FROM public."PortalTicket" WHERE id=ANY(p_ids) AND "ticketCode" LIKE 'MAIN-ASMS-%' AND "flowData" ? 'MAIN_ASSET' ORDER BY id FOR UPDATE;
    IF (SELECT count(*) FROM public."PortalTicket" WHERE id=ANY(p_ids) AND "ticketCode" LIKE 'MAIN-ASMS-%' AND "flowData" ? 'MAIN_ASSET') <> (SELECT count(DISTINCT x) FROM unnest(p_ids) x) THEN
      RAISE EXCEPTION 'Danh sách Main ASMS đã thay đổi. Vui lòng tải lại.';
    END IF;
    IF p_action='DELETE' AND EXISTS (
      SELECT 1 FROM public."Asset" a JOIN public."PortalTicket" m ON upper(trim(a."asmsBarcode"))=upper(trim(m."flowData"->'MAIN_ASSET'->>'barcode')) WHERE m.id=ANY(p_ids)
    ) THEN RAISE EXCEPTION 'Không thể xóa Main ASMS còn linh kiện Sub-ASMS gắn vào. Hãy gỡ liên kết trước.'; END IF;
    FOR item IN SELECT * FROM public."PortalTicket" WHERE id=ANY(p_ids) LOOP
      before_value := item."flowData"->'MAIN_ASSET'; after_value := NULL;
      IF p_action='DELETE' THEN DELETE FROM public."PortalTicket" WHERE id=item.id;
      ELSE
        after_value := before_value || jsonb_build_object('owner','Store','status','UN_USED','updatedAt',now());
        UPDATE public."PortalTicket" SET "flowData"=jsonb_set("flowData",'{MAIN_ASSET}',after_value), "updatedAt"=now(), "updatedBy"='Reset về kho' WHERE id=item.id;
      END IF;
      INSERT INTO public."AuditLog" (id,"entityName","entityId","actionType","oldValues","newValues","changedBy","updateSource",timestamp)
      VALUES (gen_random_uuid()::text,'MainAsset',item.id,CASE WHEN p_action='DELETE' THEN 'DELETE'::public."AuditAction" ELSE 'UPDATE'::public."AuditAction" END,before_value,after_value,coalesce(auth.jwt()->>'email','Admin'),'MANUAL',now());
      affected := affected+1;
    END LOOP;
  ELSE
    PERFORM 1 FROM public."Asset" WHERE id=ANY(p_ids) ORDER BY id FOR UPDATE;
    IF (SELECT count(*) FROM public."Asset" WHERE id=ANY(p_ids)) <> (SELECT count(DISTINCT x) FROM unnest(p_ids) x) THEN
      RAISE EXCEPTION 'Danh sách Sub-ASMS đã thay đổi. Vui lòng tải lại.';
    END IF;
    IF p_action='RESET' THEN
      INSERT INTO public."MasterData" (id,type,name,active,"createdAt","updatedAt") VALUES(gen_random_uuid()::text,'OWNER','Store',true,now(),now())
      ON CONFLICT(type,name) DO UPDATE SET active=true RETURNING id INTO store_id;
    END IF;
    FOR item IN SELECT * FROM public."Asset" WHERE id=ANY(p_ids) LOOP
      before_value := to_jsonb(item); after_value := NULL;
      IF p_action='DELETE' THEN DELETE FROM public."Asset" WHERE id=item.id;
      ELSE
        UPDATE public."Asset" SET "ownerId"=store_id,status='UN_USED',"updatedAt"=now(),"updatedBy"='Reset về kho' WHERE id=item.id RETURNING to_jsonb("Asset".*) INTO after_value;
      END IF;
      INSERT INTO public."AuditLog" (id,"entityName","entityId","actionType","oldValues","newValues","changedBy","updateSource",timestamp)
      VALUES (gen_random_uuid()::text,'Asset',item.id,CASE WHEN p_action='DELETE' THEN 'DELETE'::public."AuditAction" ELSE 'UPDATE'::public."AuditAction" END,before_value,after_value,coalesce(auth.jwt()->>'email','Admin'),'MANUAL',now());
      affected := affected+1;
    END LOOP;
  END IF;
  RETURN jsonb_build_object('count',affected,'scope',p_scope);
END $$;
REVOKE ALL ON FUNCTION public.inventory_manage(text,text,text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.inventory_manage(text,text,text[]) TO authenticated;

CREATE OR REPLACE FUNCTION public.asset_utilize(p_id text)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path=public AS $$
DECLARE a public."Asset"; store_id text; result jsonb;
BEGIN
  IF NOT public.is_sub_asms_allowed() THEN RAISE EXCEPTION 'Không có quyền truy cập.'; END IF;
  SELECT * INTO a FROM public."Asset" WHERE id=p_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Không tìm thấy tài sản.'; END IF;
  IF a."purchaseDate" IS NULL OR greatest(a."purchaseDate",a."createdAt") > now()-interval '6 months' THEN
    RAISE EXCEPTION 'Utilize chỉ áp dụng sau ít nhất 6 tháng trong kho kể từ ngày mua/ngày nhập.';
  END IF;
  IF a.status::text <> 'UN_USED' OR NOT EXISTS(SELECT 1 FROM public."MasterData" WHERE id=a."ownerId" AND lower(trim(name))='store') THEN
    RAISE EXCEPTION 'Utilize yêu cầu Owner Store và Status UN_USED.';
  END IF;
  IF EXISTS(SELECT 1 FROM public."AuditLog" l JOIN public."MasterData" m ON m.id IN (l."newValues"->>'ownerId',l."oldValues"->>'ownerId') WHERE l."entityName"='Asset' AND l."entityId"=p_id AND lower(trim(m.name)) <> 'store') THEN
    RAISE EXCEPTION 'Tài sản đã có lịch sử sử dụng ngoài Store, không thể Utilize.';
  END IF;
  INSERT INTO public."MasterData" (id,type,name,active,"createdAt","updatedAt") VALUES(gen_random_uuid()::text,'PURCHASING_UNIT','Store',true,now(),now())
  ON CONFLICT(type,name) DO UPDATE SET active=true RETURNING id INTO store_id;
  IF a."purchasingUnitId"=store_id THEN RAISE EXCEPTION 'Purchasing Unit đã là Store.'; END IF;
  UPDATE public."Asset" SET "purchasingUnitId"=store_id,"updatedAt"=now(),"updatedBy"='Utilize' WHERE id=p_id RETURNING to_jsonb("Asset".*) INTO result;
  INSERT INTO public."AuditLog" (id,"entityName","entityId","actionType","oldValues","newValues","changedBy","updateSource",timestamp)
  VALUES(gen_random_uuid()::text,'Asset',p_id,'UPDATE',to_jsonb(a),result,coalesce(auth.jwt()->>'email','Admin'),'MANUAL',now());
  RETURN result;
END $$;
REVOKE ALL ON FUNCTION public.asset_utilize(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.asset_utilize(text) TO authenticated;
NOTIFY pgrst, 'reload schema';
