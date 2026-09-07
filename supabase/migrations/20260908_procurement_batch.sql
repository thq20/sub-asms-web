CREATE OR REPLACE FUNCTION public.asset_batch_create_catalog(payload jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path=public AS $$
DECLARE result jsonb; ids text[]; purchase_code text := nullif(trim(payload->>'procurementCode'),'');
BEGIN
  IF NOT public.is_sub_asms_allowed() THEN RAISE EXCEPTION 'Không có quyền truy cập.'; END IF;
  IF purchase_code IS NOT NULL AND NOT EXISTS(SELECT 1 FROM public."MasterData" WHERE type::text='PROCUREMENT_CODE' AND active AND name=purchase_code) THEN RAISE EXCEPTION 'Chọn Code mua sắm từ Dữ liệu nền.'; END IF;
  result := public.asset_batch_create(payload);
  SELECT array_agg(item->>'id') INTO ids FROM jsonb_array_elements(result->'items') item;
  UPDATE public."Asset" SET "procurementCode"=purchase_code WHERE id=ANY(ids);
  UPDATE public."AuditLog" SET "newValues"="newValues"||jsonb_build_object('procurementCode',purchase_code) WHERE "entityName"='Asset' AND "entityId"=ANY(ids) AND "actionType"::text='CREATE';
  SELECT jsonb_build_object('items',jsonb_agg(to_jsonb(a) ORDER BY a.barcode)) INTO result FROM public."Asset" a WHERE id=ANY(ids);
  RETURN result;
END $$;
REVOKE ALL ON FUNCTION public.asset_batch_create_catalog(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.asset_batch_create_catalog(jsonb) TO authenticated;
NOTIFY pgrst, 'reload schema';
