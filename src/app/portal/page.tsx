"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, ClipboardList, Link, Plus, Save } from "lucide-react";
import { dataApiCall } from "../../lib/supabaseBrowser";

type Ticket = { id: string; ticketCode: string; currentStep: string; flowData: Record<string, Record<string, string>>; updatedAt: string };
const steps = [
  ["REQUESTER", "Requester", "Input"],
  ["BUL_APPROVE", "BUL Approve", "Approval"],
  ["ADMIN_PROCESS", "Admin Process", "Output"],
  ["IT_SETUP", "IT setup", "Setup"],
  ["ADMIN_CLOSE", "Admin Close", "Close"],
];
const fields: Record<string, Array<[string, string, string]>> = {
  REQUESTER: [["requesterName", "Requester", "Tên người yêu cầu"], ["requestType", "Request Type", "Ví dụ: cấp phát tài sản"], ["requestDetail", "Request Detail", "Mô tả yêu cầu"]],
  BUL_APPROVE: [["approver", "Approver", "Tên người duyệt"], ["decision", "Decision", "Approved / Rejected"], ["comment", "Comment", "Ghi chú phê duyệt"]],
  ADMIN_PROCESS: [["asmsBarcode", "Barcode ASMS", "ASMS-00001"], ["owner", "Owner", "NguyenVanA"], ["location", "Location", "VietNam01"], ["floor", "Floor", "Floor 3"], ["serialNumber", "Serial Number", "SN-001"], ["assetType", "Asset Type", "Laptop"], ["seatCode", "Seat Code", "A3-15"], ["note", "Note", "Sub-ASMS: SSD-00001 đã gửi tài sản cho nhân viên"]],
  IT_SETUP: [["technician", "Technician", "Tên kỹ thuật viên"], ["setupNote", "Setup Note", "Nội dung cài đặt"], ["setupCompletedAt", "Completed At", "YYYY-MM-DD"]],
  ADMIN_CLOSE: [["closingNote", "Closing Note", "Ghi chú đóng yêu cầu"], ["closedAt", "Closed At", "YYYY-MM-DD"]],
};
const defaults = () => ({ REQUESTER: {}, BUL_APPROVE: {}, ADMIN_PROCESS: {}, IT_SETUP: {}, ADMIN_CLOSE: {} });

export default function PortalPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]), [selected, setSelected] = useState<Ticket | null>(null), [step, setStep] = useState("REQUESTER"), [flash, setFlash] = useState("");
  const call = (url: string, init?: RequestInit) => dataApiCall(url, init);
  const notify = (message: string) => { setFlash(message); window.setTimeout(() => setFlash(""), 2800); };
  const load = async () => {
    try {
      const result = await call("/api/portal/tickets"); setTickets(result);
      const fromUrl = new URLSearchParams(window.location.search).get("ticket");
      const active = result.find((item: Ticket) => item.id === fromUrl) || result[0] || null;
      if (active) { setSelected(active); setStep(active.currentStep); }
    } catch (error: any) { notify(error.message); }
  };
  useEffect(() => { load(); }, []);
  const create = async () => {
    try {
      const ticket = await call("/api/portal/tickets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ flowData: defaults() }) });
      setTickets(items => [ticket, ...items]); setSelected(ticket); setStep("REQUESTER"); notify("Đã tạo ticket Portal.");
    } catch (error: any) { notify(error.message); }
  };
  const values = selected?.flowData?.[step] || {};
  const updateField = (name: string, value: string) => setSelected(current => current ? { ...current, flowData: { ...defaults(), ...(current.flowData || {}), [step]: { ...(current.flowData?.[step] || {}), [name]: value } } } : current);
  const save = async () => {
    if (!selected) return;
    try {
      const updated = await call("/api/portal/tickets/" + selected.id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ flowData: selected.flowData, currentStep: step, updatedBy: step === "ADMIN_PROCESS" ? "Admin" : step }) });
      setSelected(updated); setTickets(items => items.map(item => item.id === updated.id ? updated : item)); notify("Đã lưu " + steps.find(item => item[0] === step)?.[1] + ".");
    } catch (error: any) { notify(error.message); }
  };
  const shareLink = selected && typeof window !== "undefined" ? window.location.origin + "/portal?ticket=" + selected.id : "";

  return <div className="portal-shell">
    <header className="portal-top"><div><a href="/" className="portal-brand">Sub-Portal</a><span>Request workflow simulator</span></div><button className="button" onClick={create}><Plus size={16} />Tạo ticket</button></header>
    <main className="portal-main">
      <aside className="portal-left"><div className="portal-title"><ClipboardList size={18} /><span>Tickets</span></div>{tickets.length ? tickets.map(ticket => <button className={"portal-ticket " + (selected?.id === ticket.id ? "selected" : "")} onClick={() => { setSelected(ticket); setStep(ticket.currentStep); }} key={ticket.id}><b>{ticket.ticketCode}</b><small>{ticket.currentStep.replace("_", " ")}</small></button>) : <p className="portal-empty">Chưa có ticket. Hãy tạo ticket đầu tiên.</p>}
        {selected && <><div className="portal-title flow-title">Flow</div><div className="flow">{steps.map(([id, name, kind], index) => <button className={"flow-step " + (step === id ? "active" : "")} onClick={() => setStep(id)} key={id}><span className="flow-number">{index + 1}</span><span><b>{name}</b><small>{kind}</small></span>{index < steps.length - 1 && <ChevronRight size={14} />}</button>)}</div></>}
      </aside>
      <section className="portal-content">{selected ? <><div className="portal-section-head"><div><p className="portal-kicker">{steps.find(item => item[0] === step)?.[2]}</p><h1>{steps.find(item => item[0] === step)?.[1]}</h1><p className="muted">{selected.ticketCode}</p></div><span className="portal-status"><CheckCircle2 size={15} />{selected.currentStep.replace("_", " ")}</span></div>
        {step === "ADMIN_PROCESS" && <div className="portal-notice">Đây là Output của Admin. Sub-ASMS đọc các trường Owner, Location, Floor… và tự bốc tách mã Sub-ASMS từ Note qua link ticket.</div>}
        <div className="portal-form">{fields[step].map(([name, label, placeholder]) => <label key={name}>{label}<input value={values[name] || ""} onChange={event => updateField(name, event.target.value)} placeholder={placeholder} /></label>)}</div>
        <div className="portal-actions"><button className="button" onClick={save}><Save size={16} />Lưu {steps.find(item => item[0] === step)?.[1]}</button></div>
        <div className="portal-link"><Link size={15} /><span>Link để dán vào Sub-ASMS:</span><code>{shareLink}</code></div>
      </> : <div className="portal-empty large">Tạo hoặc chọn một ticket để bắt đầu flow.</div>}</section>
    </main>{flash && <div className="flash">{flash}</div>}
  </div>;
}
