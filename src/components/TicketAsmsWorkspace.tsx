"use client";

import { useEffect, useState } from "react";
import { TicketWorkspace } from "./TicketWorkspace";
import { dataApiCall } from "../lib/supabaseBrowser";

type Master = { id: string; type: string; name: string };

export function TicketAsmsWorkspace({ mode }: { mode: "my" | "read" }) {
  const [master, setMaster] = useState<Master[]>([]), [flash, setFlash] = useState("");
  const call = (url: string, init?: RequestInit) => dataApiCall(url, init);
  const notify = (message: string) => { setFlash(message); window.setTimeout(() => setFlash(""), 3500); };
  const load = async () => { try { setMaster(await call("/api/master-data")); } catch (error: any) { notify(error.message); } };
  useEffect(() => { load(); const refresh = () => load(); window.addEventListener("master-data-changed", refresh); return () => window.removeEventListener("master-data-changed", refresh); }, []);
  return <div className="ticket-asms-shell"><div className="ticket-asms-head"><p className="portal-kicker">TICKET ASMS</p><h1>{mode === "my" ? "My Ticket" : "Đọc ticket"}</h1></div><TicketWorkspace call={call} master={master} notify={notify} refresh={async () => { window.dispatchEvent(new Event("inventory-changed")); }} mode={mode} />{flash && <div className="flash">{flash}</div>}</div>;
}
