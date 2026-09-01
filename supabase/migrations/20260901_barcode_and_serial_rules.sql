-- ASMS Barcode is an optional, shared external barcode. It is not generated and may be reused.
ALTER TABLE public."Asset" DROP CONSTRAINT IF EXISTS "Asset_asmsBarcode_key";
DROP INDEX IF EXISTS public."Asset_asmsBarcode_key";
CREATE INDEX IF NOT EXISTS "Asset_asmsBarcode_idx" ON public."Asset" ("asmsBarcode");

-- Empty values are treated as missing. Only non-empty serial numbers must be unique.
UPDATE public."Asset" SET "asmsBarcode" = NULLIF(BTRIM("asmsBarcode"), '');
UPDATE public."Asset" SET "serialNumber" = NULLIF(BTRIM("serialNumber"), '');
CREATE UNIQUE INDEX IF NOT EXISTS "Asset_serialNumber_key"
  ON public."Asset" ("serialNumber")
  WHERE "serialNumber" IS NOT NULL;
