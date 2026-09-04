"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ClipboardList, Flag, Hand, MonitorCog, Plus, Save, Send, Trash2, Wrench } from "lucide-react";
import { dataApiCall } from "../../lib/supabaseBrowser";

type Master = { id: string; type: string; name: string };
type Ticket = { id: string; ticketCode: string; currentStep: string; flowData: Record<string, Record<string, string>>; updatedAt: string };
type OutputRow = Record<string, string>;
type Discussion = { id: string; content: string; createdAt: string; author: string };

const phases = [["REQUESTER", "Requester"], ["BUL_APPROVE", "BUL Approve"], ["ADMIN_PROCESS", "Admin Process"], ["IT_SETUP", "IT Setup"], ["CONFIRM", "Confirm"], ["CLOSE", "Close"]] as const;
const phaseName = (id: string) => phases.find(([key]) => key === id)?.[1] || id.replaceAll("_", " ");
const defaults = () => ({ REQUESTER: {}, BUL_APPROVE: {}, ADMIN_PROCESS: {}, IT_SETUP: {}, CONFIRM: {}, CLOSE: {}, DISCUSSION: {}, TICKET_ASMS: {} });
const emptyRow = (): OutputRow => ({ owner: "", barcode: "", floor: "", location: "", seatCode: "", assetName: "", expectedDate: "", note: "" });
function parseRows(data: Record<string, string> = {}) { try { const rows = JSON.parse(data.outputRows || "[]"); if (Array.isArray(rows) && rows.length) return rows.map(row => ({ ...emptyRow(), ...row })); } catch { /* legacy output remains readable */ } return Object.keys(data).length ? [{ ...emptyRow(), ...data }] : [emptyRow()]; }
function parseDiscussion(data: Record<string, string> = {}) { try { const list = JSON.parse(data.items || "[]"); return Array.isArray(list) ? list as Discussion[] : []; } catch { return []; } }
function PhaseIcon({ id }: { id: string }) { if (id === "REQUESTER") return <Send size={18} />; if (id === "BUL_APPROVE") return <Hand size={18} />; if (id === "ADMIN_PROCESS") return <MonitorCog size={18} />; if (id === "IT_SETUP") return <Wrench size={18} />; if (id === "CONFIRM") return <CheckCircle2 size={18} />; return <Flag size={18} />; }

export default function PortalWorkspace() {
  const [tickets, setTickets] = useState<Ticket[]>([]), [selected, setSelected] = useState<Ticket | null>(null), [viewPhase, setViewPhase] = useState("REQUESTER"), [master, setMaster] = useState<Master[]>([]), [flash, setFlash] = useState(""), [busy, setBusy] = useState(false);
  const call = (url: string, init?: RequestInit) => dataApiCall(url, init);
  const notify = (message: string) => { setFlash(message); window.setTimeout(() => setFlash(""), 3500); };
  const options = (type: string, fallback: string[] = []) => { const values = master.filter(item => item.type === type).map(item => item.name); return values.length ? values : fallback; };
  const activeIndex = selected ? Math.max(0, phases.findIndex(([id]) => id === selected.currentStep)) : 0;
  const currentData = selected?.flowData?.[viewPhase] || {};
  const outputRows = useMemo(() => parseRows(selected?.flowData?.ADMIN_PROCESS || {}), [selected]);
  const discussions = parseDiscussion(selected?.flowData?.DISCUSSION);

  const load = async () => {
    try {
      const [result, lists] = await Promise.all([call("/api/portal/tickets"), call("/api/master-data")]);
      setTickets(result); setMaster(lists);
      const ticketId = new URLSearchParams(window.location.search).get("ticket");
      const active = result.find((item: Ticket) => item.id === ticketId) || result[0] || null;
      setSelected(active); if (active) setViewPhase(active.currentStep || "REQUESTER");
    } catch (error: any) { notify(error.message); }
  };
  useEffect(() => { load(); const refresh = () => load(); window.addEventListener("master-data-changed", refresh); return () => window.removeEventListener("master-data-changed", refresh); }, []);
  const create = async () => {
    try { setBusy(true); const ticket = await call("/api/portal/tickets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ flowData: defaults() }) }); setTickets(items => [ticket, ...items]); setSelected(ticket); setViewPhase("REQUESTER"); notify("Đã tạo ticket Portal."); }
    catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };
  const remove = async (ticket: Ticket) => {
    if (!window.confirm(`Xóa ticket ${ticket.ticketCode}? Thao tác này không thể hoàn tác.`)) return;
    try { await call("/api/portal/tickets/" + ticket.id, { method: "DELETE" }); const next = tickets.filter(item => item.id !== ticket.id); setTickets(next); setSelected(next[0] || null); setViewPhase(next[0]?.currentStep || "REQUESTER"); window.dispatchEvent(new Event("tickets-changed")); notify("Đã xóa ticket."); } catch (error: any) { notify(error.message); }
  };
  const updateField = (field: string, value: string) => setSelected(current => current ? ({ ...current, flowData: { ...defaults(), ...current.flowData, [viewPhase]: { ...(current.flowData?.[viewPhase] || {}), [field]: value } } }) : current);
  const updateRows = (rows: OutputRow[]) => setSelected(current => current ? ({ ...current, flowData: { ...defaults(), ...current.flowData, ADMIN_PROCESS: { ...(current.flowData?.ADMIN_PROCESS || {}), outputRows: JSON.stringify(rows) } } }) : current);
  const save = async () => {
    if (!selected) return;
    const phaseIndex = phases.findIndex(([id]) => id === viewPhase);
    const nextStep = phaseIndex >= phases.length - 1 ? "CLOSE" : phases[phaseIndex + 1][0];
    try {
      setBusy(true); const updated = await call("/api/portal/tickets/" + selected.id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ flowData: selected.flowData, currentStep: nextStep, updatedBy: viewPhase }) });
      setSelected(updated); setTickets(items => items.map(item => item.id === updated.id ? updated : item)); setViewPhase(nextStep); window.dispatchEvent(new Event("tickets-changed")); notify(viewPhase === "ADMIN_PROCESS" ? "Đã lưu Output. Ticket đã chuyển sang Ticket ASMS." : `Đã hoàn tất ${phaseName(viewPhase)}.`);
    } catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };
  const selectTicket = (ticket: Ticket) => { setSelected(ticket); setViewPhase(ticket.currentStep || "REQUESTER"); };
  const canOpen = (id: string) => phases.findIndex(([key]) => key === id) <= activeIndex;
  const connectorState = (index: number) => index < activeIndex ? "done" : index === activeIndex ? "next" : "locked";
  const phaseField = (name: string, title: string, list: string[]) => <label key={name}>{title}<select value={currentData[name] || ""} onChange={event => updateField(name, event.target.value)}><option value="">Chọn {title}</option>{list.map(value => <option key={value}>{value}</option>)}</select></label>;
  const currentPanel = () => {
    if (!selected) return null;
    if (viewPhase === "REQUESTER") return <div className="portal-form">{phaseField("owner", "Requester", options("OWNER"))}{phaseField("building", "Building", options("LOCATION"))}{phaseField("requestType", "Request Type", options("REQUEST_TYPE", ["Request Desktop", "Request Laptop"]))}</div>;
    if (viewPhase === "BUL_APPROVE") return <div className="portal-form">{phaseField("approver", "Approver", options("APPROVER", ["BUL_1"]))}{phaseField("decision", "Decision", ["Approved", "Rejected"])}</div>;
    if (viewPhase === "ADMIN_PROCESS") return <div className="output-owner-list">{outputRows.map((row, index) => <article className="output-owner-card" key={index}><div className="output-owner-head"><b>Output {index + 1}</b>{outputRows.length > 1 && <button className="icon-button" onClick={() => updateRows(outputRows.filter((_, rowIndex) => rowIndex !== index))} title="Xóa Output"><Trash2 size={15} /></button>}</div><div className="portal-form"><label>Owner<select value={row.owner || ""} onChange={event => updateRows(outputRows.map((item, rowIndex) => rowIndex === index ? { ...item, owner: event.target.value } : item))}><option value="">Chọn Owner</option>{options("OWNER").map(value => <option key={value}>{value}</option>)}</select></label><label>Barcode PC / Laptop<input value={row.barcode || ""} onChange={event => updateRows(outputRows.map((item, rowIndex) => rowIndex === index ? { ...item, barcode: event.target.value } : item))} /></label><label>Floor<select value={row.floor || ""} onChange={event => updateRows(outputRows.map((item, rowIndex) => rowIndex === index ? { ...item, floor: event.target.value } : item))}><option value="">Chọn Floor</option>{options("FLOOR").map(value => <option key={value}>{value}</option>)}</select></label><label>Building / Location<select value={row.location || ""} onChange={event => updateRows(outputRows.map((item, rowIndex) => rowIndex === index ? { ...item, location: event.target.value } : item))}><option value="">Chọn Building</option>{options("LOCATION").map(value => <option key={value}>{value}</option>)}</select></label><label>Asset Name<select value={row.assetName || ""} onChange={event => updateRows(outputRows.map((item, rowIndex) => rowIndex === index ? { ...item, assetName: event.target.value } : item))}><option value="">Chọn Asset Name</option>{["Case PC", "Laptop", "Case PC + Monitor"].map(value => <option key={value}>{value}</option>)}</select></label><label>Seatcode<input value={row.seatCode || ""} onChange={event => updateRows(outputRows.map((item, rowIndex) => rowIndex === index ? { ...item, seatCode: event.target.value } : item))} /></label><label>Expected Date<input type="date" value={row.expectedDate || ""} onChange={event => updateRows(outputRows.map((item, rowIndex) => rowIndex === index ? { ...item, expectedDate: event.target.value } : item))} /></label><label className="wide">Note<input value={row.note || ""} onChange={event => updateRows(outputRows.map((item, rowIndex) => rowIndex === index ? { ...item, note: event.target.value } : item))} /></label></div></article>)}<button className="button secondary" onClick={() => updateRows([...outputRows, emptyRow()])}><Plus size={16} />Thêm Owner / thiết bị</button></div>;
    if (viewPhase === "IT_SETUP") return <div className="portal-form">{phaseField("technician", "Technician", options("TECHNICIAN", ["Tech_1"]))}{phaseField("setupNote", "Setup Note", options("SETUP_NOTE", ["Done"]))}</div>;
    if (viewPhase === "CONFIRM") return <div className="portal-form">{phaseField("confirmNote", "Confirm Note", ["Done"])}</div>;
    return <div className="portal-form">{phaseField("closingNote", "Closing Note", options("CLOSING_NOTE", ["Done"]))}</div>;
  };
  const requester = selected?.flowData?.REQUESTER || {};
  return <div className="portal-shell"><div className="portal-topline"><div><p className="portal-kicker">PORTAL</p><h1>Ticket Portal</h1></div><button className="button" disabled={busy} onClick={create}><Plus size={16} />Tạo ticket</button></div><div className="portal-workbench"><aside className="portal-ticket-list"><div className="portal-title"><ClipboardList size={18} /><span>Danh sách ticket</span></div>{tickets.length ? tickets.map(ticket => <article className={"portal-ticket-card " + (selected?.id === ticket.id ? "selected" : "")} key={ticket.id}><button className="portal-ticket-main" onClick={() => selectTicket(ticket)}><b>{ticket.ticketCode}</b><small>{phaseName(ticket.currentStep)}</small></button><button className="ticket-delete" title="Xóa ticket" onClick={() => remove(ticket)}><Trash2 size={14} /></button></article>) : <p className="portal-empty">Chưa có ticket.</p>}</aside><section className="portal-editor">{selected ? <><section className="ticket-information"><div><b>Ticket Information</b><span>{selected.ticketCode}</span></div><dl><dt>Requester</dt><dd>{requester.owner || "—"}</dd><dt>Request Type</dt><dd>{requester.requestType || "—"}</dd><dt>Building</dt><dd>{requester.building || "—"}</dd><dt>Status</dt><dd><span className="processing-label">{phaseName(selected.currentStep)}</span></dd></dl></section><section className="portal-phase-layout"><aside className="workflow-vertical">{phases.map(([id, name], index) => <div className="workflow-step-wrap" key={id}><button disabled={!canOpen(id)} onClick={() => setViewPhase(id)} className={"workflow-step " + (viewPhase === id ? "active " : "") + (index < activeIndex ? "done " : index === activeIndex ? "current" : "locked")}><span><PhaseIcon id={id} /></span><b>{name}</b></button>{index < phases.length - 1 && <i className={"workflow-connector " + connectorState(index)} />}</div>)}</aside><section className="phase-editor"><div className="phase-title"><div><p className="portal-kicker">PHASE INFORMATION</p><h2>{phaseName(viewPhase)}</h2></div><span className={"phase-state " + (viewPhase === selected.currentStep ? "current" : "")}>{viewPhase === selected.currentStep ? "Cần xử lý" : "Đã hoàn tất"}</span></div>{currentPanel()}<div className="portal-actions"><button className="button" disabled={busy || viewPhase !== selected.currentStep} onClick={save}><Save size={16} />{viewPhase === "ADMIN_PROCESS" ? "Lưu Output" : "Hoàn tất phase"}</button></div></section></section><section className="portal-section discussion-section"><div className="section-title"><h2>Discussion</h2><span className="muted">Sub-ASMS sẽ tự ghi nhận kết quả tại đây.</span></div>{discussions.length ? <div className="discussion-list">{discussions.map(item => <article className="discussion-item" key={item.id}><div><b>{item.author || "Sub-ASMS"}</b><small>{new Date(item.createdAt).toLocaleString("vi-VN")}</small></div><pre>{item.content}</pre></article>)}</div> : <p className="portal-empty">Chưa có trao đổi nào.</p>}</section></> : <div className="portal-empty large">Bấm “Tạo ticket” để bắt đầu.</div>}</section></div>{flash && <div className="flash">{flash}</div>}</div>;
}
