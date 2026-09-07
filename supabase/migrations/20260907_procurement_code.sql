ALTER TABLE public."Asset"
  ADD COLUMN IF NOT EXISTS "procurementCode" text;

CREATE INDEX IF NOT EXISTS "Asset_procurementCode_idx"
  ON public."Asset" ("procurementCode");
