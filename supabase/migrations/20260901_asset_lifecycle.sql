ALTER TABLE public."Asset"
  ADD COLUMN IF NOT EXISTS "purchaseDate" timestamptz,
  ADD COLUMN IF NOT EXISTS "warrantyExpiry" timestamptz;

ALTER TABLE public."AuditLog"
  ADD COLUMN IF NOT EXISTS "updateSource" text NOT NULL DEFAULT 'MANUAL';

-- asset_batch_create was refreshed in Supabase SQL Editor to write purchaseDate,
-- warrantyExpiry and MANUAL source tags for newly created assets.
