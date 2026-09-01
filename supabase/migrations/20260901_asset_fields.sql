-- Applied to the hosted Supabase project on 2026-09-01.
-- Keeps the cloud schema aligned with prisma/schema.prisma.
ALTER TYPE public."MasterDataType" ADD VALUE IF NOT EXISTS 'ASSET_TYPE';

ALTER TABLE public."Asset"
  ADD COLUMN IF NOT EXISTS "description" text,
  ADD COLUMN IF NOT EXISTS "originalCost" numeric(15,2),
  ADD COLUMN IF NOT EXISTS "assetTypeId" text;

CREATE INDEX IF NOT EXISTS "Asset_assetTypeId_idx" ON public."Asset" ("assetTypeId");

-- asset_batch_create is maintained in the Supabase SQL Editor. It must accept
-- description, originalCost and assetTypeId from the batch payload.
