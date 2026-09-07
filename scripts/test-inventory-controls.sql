-- Integration checks using isolated fixtures; always rolled back.
BEGIN;
SELECT set_config('request.jwt.claims',jsonb_build_object('email',(SELECT email FROM public."AllowedUser" WHERE active LIMIT 1))::text,true) IS NOT NULL AS test_context;
DO $$
DECLARE main_id text := gen_random_uuid()::text; sub_id text := gen_random_uuid()::text; ticket_id text := gen_random_uuid()::text;
owner_id text; result jsonb; rejected boolean; version text;
BEGIN
  IF has_function_privilege('anon','public.inventory_manage(text,text,text[])','EXECUTE') OR has_function_privilege('anon','public.asset_utilize(text)','EXECUTE') OR has_function_privilege('anon','public.asset_edit(text,jsonb,text)','EXECUTE') THEN RAISE EXCEPTION 'FAIL anonymous RPC access'; END IF;
  INSERT INTO public."MasterData" (id,type,name,active,"createdAt","updatedAt") VALUES(gen_random_uuid()::text,'OWNER','Store',true,now(),now()) ON CONFLICT(type,name) DO UPDATE SET active=true RETURNING id INTO owner_id;
  INSERT INTO public."PortalTicket" (id,"ticketCode","currentStep","flowData","createdAt","updatedAt","createdBy","updatedBy") VALUES
  (main_id,'MAIN-ASMS-QATEST-'||main_id,'MAIN_ASMS',jsonb_build_object('MAIN_ASSET',jsonb_build_object('barcode','QATEST-'||main_id,'owner','Test','status','IN_USED')),now(),now(),'Test','Test'),
  (ticket_id,'QATEST-'||ticket_id,'REQUESTER','{}',now(),now(),'Test','Test');
  INSERT INTO public."Asset" (id,barcode,prefix,status,"ownerId","asmsBarcode","purchaseDate","createdAt","updatedAt","createdBy","updatedBy") VALUES(sub_id,'QATEST-'||sub_id,'QA','IN_USED',owner_id,'QATEST-'||main_id,now(),now(),now(),'Test','Test');
  rejected:=false;
  BEGIN PERFORM public.inventory_manage('MAIN','DELETE',ARRAY[main_id]); EXCEPTION WHEN OTHERS THEN rejected:=true; END;
  IF NOT rejected THEN RAISE EXCEPTION 'FAIL linked Main delete'; END IF;
  rejected:=false;
  BEGIN PERFORM public.inventory_manage('MAIN','DELETE',ARRAY[ticket_id]); EXCEPTION WHEN OTHERS THEN rejected:=true; END;
  IF NOT rejected THEN RAISE EXCEPTION 'FAIL ticket scope protection'; END IF;
  PERFORM public.inventory_manage('MAIN','RESET',ARRAY[main_id]);
  IF (SELECT status::text FROM public."Asset" WHERE id=sub_id) <> 'IN_USED' THEN RAISE EXCEPTION 'FAIL reset crossed scope'; END IF;
  PERFORM public.inventory_manage('SUB','RESET',ARRAY[sub_id]);
  IF (SELECT status::text FROM public."Asset" WHERE id=sub_id) <> 'UN_USED' THEN RAISE EXCEPTION 'FAIL reset Sub'; END IF;
  rejected:=false;
  BEGIN PERFORM public.asset_utilize(sub_id); EXCEPTION WHEN OTHERS THEN rejected:=true; END;
  IF NOT rejected THEN RAISE EXCEPTION 'FAIL six month guard'; END IF;
  SELECT "updatedAt"::text INTO version FROM public."Asset" WHERE id=sub_id;
  result:=public.asset_edit(sub_id,jsonb_build_object('description','Edited test','invoiceId','QA-INVOICE'),version);
  IF result->>'description' <> 'Edited test' OR NOT EXISTS(SELECT 1 FROM public."AuditLog" WHERE "entityId"=sub_id AND "newValues"->>'invoiceId'='QA-INVOICE') THEN RAISE EXCEPTION 'FAIL edit audit'; END IF;
  rejected:=false;
  BEGIN PERFORM public.asset_edit(sub_id,'{}','2000-01-01'); EXCEPTION WHEN OTHERS THEN rejected:=true; END;
  IF NOT rejected THEN RAISE EXCEPTION 'FAIL stale edit guard'; END IF;
  UPDATE public."Asset" SET "purchaseDate"=now()-interval '7 months',"createdAt"=now()-interval '7 months' WHERE id=sub_id;
  result:=public.asset_utilize(sub_id);
  IF NOT EXISTS(SELECT 1 FROM public."MasterData" WHERE id=result->>'purchasingUnitId' AND name='Store' AND type::text='PURCHASING_UNIT') THEN RAISE EXCEPTION 'FAIL eligible Utilize'; END IF;
  PERFORM public.inventory_manage('SUB','DELETE',ARRAY[sub_id]);
  IF EXISTS(SELECT 1 FROM public."Asset" WHERE id=sub_id) OR NOT EXISTS(SELECT 1 FROM public."AuditLog" WHERE "entityId"=sub_id AND "actionType"::text='DELETE') THEN RAISE EXCEPTION 'FAIL delete audit'; END IF;
  PERFORM public.inventory_manage('MAIN','DELETE',ARRAY[main_id]);
  IF NOT EXISTS(SELECT 1 FROM public."PortalTicket" WHERE id=ticket_id) THEN RAISE EXCEPTION 'FAIL ticket removed'; END IF;
  INSERT INTO public."MasterData" (id,type,name,active,"createdAt","updatedAt") VALUES(gen_random_uuid()::text,'PROCUREMENT_CODE','QATEST-'||ticket_id,true,now(),now());
  result:=public.asset_batch_create_catalog(jsonb_build_object('prefix','QATEST','quantity',2,'procurementCode','QATEST-'||ticket_id,'serialNumbers',jsonb_build_array('','')));
  IF jsonb_array_length(result->'items')<>2 OR EXISTS(SELECT 1 FROM jsonb_array_elements(result->'items') item WHERE item->>'procurementCode' <> 'QATEST-'||ticket_id) THEN RAISE EXCEPTION 'FAIL procurement batch'; END IF;
  IF has_function_privilege('anon','public.asset_batch_create_catalog(jsonb)','EXECUTE') THEN RAISE EXCEPTION 'FAIL batch anonymous access'; END IF;
  IF has_table_privilege('anon','public."Asset"','SELECT') OR has_table_privilege('anon','public."PortalTicket"','SELECT') THEN RAISE EXCEPTION 'FAIL anonymous data access'; END IF;
END $$;
ROLLBACK;
SELECT 'PASS: isolated reset/delete, linked Main guard, six-month guard, edit audit, stale edit guard, anonymous RPC blocked; fixtures rolled back' AS result;
