CREATE TABLE IF NOT EXISTS public."PortalTicket" (
  "id" text PRIMARY KEY,
  "ticketCode" text UNIQUE NOT NULL,
  "currentStep" text NOT NULL DEFAULT 'REQUESTER',
  "flowData" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "createdBy" text NOT NULL DEFAULT 'Requester',
  "updatedBy" text NOT NULL DEFAULT 'Requester'
);

CREATE INDEX IF NOT EXISTS "PortalTicket_currentStep_updatedAt_idx"
  ON public."PortalTicket" ("currentStep", "updatedAt");

ALTER TABLE public."PortalTicket" ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public."PortalTicket" TO anon;
CREATE POLICY "mvp_portal_ticket_all" ON public."PortalTicket"
  FOR ALL TO anon USING (true) WITH CHECK (true);
