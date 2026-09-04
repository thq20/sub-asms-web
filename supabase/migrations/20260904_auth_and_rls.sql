-- Run once in Supabase SQL Editor after enabling Email Auth.
-- Only the listed emails can access the Sub-ASMS database through the browser.

CREATE TABLE IF NOT EXISTS public."AllowedUser" (
  "email" text PRIMARY KEY,
  "active" boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public."AllowedUser" ("email")
VALUES ('quanth33.fs0323@gmail.com')
ON CONFLICT ("email") DO UPDATE SET "active" = true;

CREATE OR REPLACE FUNCTION public.is_sub_asms_allowed()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public."AllowedUser"
    WHERE lower("email") = lower(coalesce(auth.jwt() ->> 'email', ''))
      AND "active" = true
  );
$$;

REVOKE ALL ON TABLE public."AllowedUser" FROM anon, authenticated;
ALTER TABLE public."AllowedUser" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "mvp_portal_ticket_all" ON public."PortalTicket";

DO $$
DECLARE target text;
DECLARE legacy_policy text;
BEGIN
  FOREACH target IN ARRAY ARRAY['Asset', 'BarcodeSequence', 'MasterData', 'AuditLog', 'FilterTemplate', 'DraftTicket', 'PortalTicket']
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', target);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon', target);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.%I TO authenticated', target);
    EXECUTE format('DROP POLICY IF EXISTS "sub_asms_authenticated_only" ON public.%I', target);
    EXECUTE format('CREATE POLICY "sub_asms_authenticated_only" ON public.%I FOR ALL TO authenticated USING (public.is_sub_asms_allowed()) WITH CHECK (public.is_sub_asms_allowed())', target);
    FOR legacy_policy IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = target AND 'anon' = ANY(roles)
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', legacy_policy, target);
    END LOOP;
  END LOOP;
END;
$$;

REVOKE ALL ON FUNCTION public.asset_batch_create(jsonb) FROM anon;
GRANT EXECUTE ON FUNCTION public.asset_batch_create(jsonb) TO authenticated;
