CREATE OR REPLACE FUNCTION public.asset_edit(p_id text, p_patch jsonb, p_expected text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path=public AS $$
DECLARE a public."Asset"; b public."Asset"; result jsonb; changes jsonb;
BEGIN
  IF NOT public.is_sub_asms_allowed() THEN RAISE EXCEPTION 'Không có quyền truy cập.'; END IF;
  SELECT * INTO a FROM public."Asset" WHERE id=p_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Tài sản đã bị xóa hoặc không tồn tại.'; END IF;
  IF p_expected IS NOT NULL AND a."updatedAt" <> p_expected::timestamptz THEN RAISE EXCEPTION 'Tài sản đã được cập nhật ở nơi khác. Đóng và mở lại tài sản trước khi sửa.'; END IF;
  SELECT coalesce(jsonb_object_agg(key,value),'{}'::jsonb) INTO changes FROM jsonb_each(p_patch)
  WHERE key IN ('asmsBarcode','serialNumber','invoiceId','procurementCode','status','locationId','floorId','ownerId','purchasingUnitId','seatCode','description','originalCost','assetTypeId','purchaseDate','warrantyExpiry','note','ticketId');
  b := jsonb_populate_record(a, changes);
  b."serialNumber" := nullif(trim(b."serialNumber"),'');
  b."asmsBarcode" := nullif(upper(trim(b."asmsBarcode")),'');
  IF b."originalCost" < 0 THEN RAISE EXCEPTION 'Giá trị tài sản không thể âm.'; END IF;
  IF b."warrantyExpiry" < b."purchaseDate" THEN RAISE EXCEPTION 'Ngày hết bảo hành phải từ ngày mua trở đi.'; END IF;
  IF b."procurementCode" IS DISTINCT FROM a."procurementCode" AND coalesce(b."procurementCode",'') <> '' AND NOT EXISTS(SELECT 1 FROM public."MasterData" WHERE type::text='PROCUREMENT_CODE' AND active AND name=b."procurementCode") THEN RAISE EXCEPTION 'Chọn Code mua sắm từ Dữ liệu nền.'; END IF;
  IF b."serialNumber" IS NOT NULL AND EXISTS(SELECT 1 FROM public."Asset" WHERE id<>p_id AND lower(trim("serialNumber"))=lower(b."serialNumber")) THEN RAISE EXCEPTION 'Serial Number đã tồn tại.'; END IF;
  IF to_jsonb(a)=to_jsonb(b) THEN RETURN to_jsonb(a); END IF;
  UPDATE public."Asset" SET "asmsBarcode"=b."asmsBarcode","serialNumber"=b."serialNumber","invoiceId"=b."invoiceId","procurementCode"=b."procurementCode",status=b.status,"locationId"=b."locationId","floorId"=b."floorId","ownerId"=b."ownerId","purchasingUnitId"=b."purchasingUnitId","seatCode"=b."seatCode",description=b.description,"originalCost"=b."originalCost","assetTypeId"=b."assetTypeId","purchaseDate"=b."purchaseDate","warrantyExpiry"=b."warrantyExpiry",note=b.note,"ticketId"=b."ticketId","updatedAt"=now(),"updatedBy"=coalesce(auth.jwt()->>'email','Admin') WHERE id=p_id RETURNING to_jsonb("Asset".*) INTO result;
  INSERT INTO public."AuditLog" (id,"entityName","entityId","actionType","oldValues","newValues","changedBy","updateSource",timestamp)
  VALUES(gen_random_uuid()::text,'Asset',p_id,'UPDATE',to_jsonb(a),result,coalesce(auth.jwt()->>'email','Admin'),CASE WHEN p_patch->>'auditSource'='AUTO' THEN 'AUTO' ELSE 'MANUAL' END,now());
  RETURN result;
END $$;
REVOKE ALL ON FUNCTION public.asset_edit(text,jsonb,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.asset_edit(text,jsonb,text) TO authenticated;
NOTIFY pgrst, 'reload schema';
