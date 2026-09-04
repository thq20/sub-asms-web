"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, ClipboardCheck, Link, PencilLine, Send, Truck } from "lucide-react";

type Master = { id: string; type: string; name: string };
type OutputRow = Record<string, string>;
type Asset = { id: string; barcode: string; description?: string; status: string; owner?: string; ownerId?: string; locationId?: string; floorId?: string; seatCode?: string; source?: "MAIN_ASMS" | "SUB_ASMS" };
type Group = { row: OutputRow; hostCode: string; componentCodes: string[]; host?: Asset; components: Asset[]; missing: string[] };

const uniqueCodes = (text = "") => [...new Set((text.toUpperCase().match(/\b[A-Z]{2,12}-\d{1,}\b/g) || []))];
const isPc = (code: string) => /^(CA|LAP)-\d+$/i.test(code);
function parseRows(output: Record<string, string> = {}) {
  try { const rows = JSON.parse(output.outputRows || "[]"); if (Array.isArray(rows) && rows.length) return rows as OutputRow[]; } catch { /* Legacy ticket uses one output. */ }
  return Object.keys(output).length ? [output] : [];
}
function parseDiscussion(data: Record<string, string> = {}) {
  try { const items = JSON.parse(data.items || "[]"); return Array.isArray(items) ? items : []; } catch { return []; }
}

export function TicketWorkspace({ call, master, notify, refresh, mode = "my" }: { call: (url: string, init?: RequestInit) => Promise<any>; master: Master[]; notify: (message: string) => void; refresh: () => Promise<void>; mode?: "my" | "read" }) {
  const [link, setLink] = useState(""), [ticket, setTicket] = useState<any>(null), [groups, setGroups] = useState<Group[]>([]), [busy, setBusy] = useState(false), [confirmedCodes, setConfirmedCodes] = useState<Record<string, boolean>>({});
  const [pending, setPending] = useState<any[]>([]);
  const loadPending = async () => { try { setPending(await call("/api/tickets/pending")); } catch (error: any) { notify(error.message); } };
  useEffect(() => { loadPending(); const reload = () => loadPending(); window.addEventListener("tickets-changed", reload); return () => window.removeEventListener("tickets-changed", reload); }, []);
  const masterId = (type: string, value?: string) => master.find(item => item.type === type && item.name.toLocaleLowerCase() === (value || "").trim().toLocaleLowerCase())?.id || "";
  const findAsset = async (code: string) => {
    const result = await call("/api/assets?size=100&page=1&q=" + encodeURIComponent(code));
    const asset = result.items.find((item: Asset) => String(item.barcode || "").toUpperCase() === code) as Asset | undefined;
    return asset ? { ...asset, source: "SUB_ASMS" as const } : undefined;
  };
  const findMainAsset = async (code: string) => {
    const items = await call("/api/main-asms/assets?q=" + encodeURIComponent(code));
    const asset = items.find((item: Asset) => String(item.barcode || "").toUpperCase() === code) as Asset | undefined;
    return asset ? { ...asset, source: "MAIN_ASMS" as const } : undefined;
  };
  const analyse = async (sourceTicket: any, editedRows: OutputRow[] = []) => {
    const rows = parseRows(sourceTicket.flowData?.ADMIN_PROCESS || {});
    const analysed = await Promise.all(rows.map(async (sourceRow, index) => {
      const row = { ...sourceRow, ...(editedRows[index] || {}) };
      const barcodeCodes = uniqueCodes(row.barcode || row.asmsBarcode || "");
      const hostCode = barcodeCodes.find(isPc) || "";
      const componentCodes = uniqueCodes(row.note || "").filter(code => code !== hostCode && !isPc(code));
      const host = hostCode ? await findMainAsset(hostCode) : undefined;
      const found = await Promise.all(componentCodes.map(findAsset));
      const components = found.filter(Boolean) as Asset[];
      const missing = componentCodes.filter(code => !components.some(asset => asset.barcode.toUpperCase() === code));
      return { row: { ...row, mainDescription: row.mainDescription ?? host?.description ?? "" }, hostCode, componentCodes, host, components, missing };
    }));
    if (!editedRows.length) setConfirmedCodes({}); setGroups(analysed); return analysed;
  };
  const readPortal = async () => {
    try {
      const id = link.includes("ticket=") ? new URL(link).searchParams.get("ticket") : link.trim();
      if (!id) return notify("Vui lòng dán link ticket Portal hợp lệ.");
      if (pending.some(item => item.id === id || String(item.ticketCode || "").toUpperCase() === id.toUpperCase())) return notify("Ticket đã tồn tại trong My Ticket.");
      setBusy(true); const result = await call("/api/tickets/read-portal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ticketId: id }) });
      setTicket(result); await analyse(result); notify("Đã phân tích Output theo từng Owner / Case PC.");
    } catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };
  const openPending = async (item: any) => { try { setBusy(true); const result = await call("/api/tickets/read-portal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ticketId: item.id }) }); setTicket(result); await analyse(result); notify("Đã mở ticket để kiểm tra."); } catch (error: any) { notify(error.message); } finally { setBusy(false); } };
  const updateGroup = (index: number, name: string, value: string) => setGroups(current => current.map((group, groupIndex) => groupIndex === index ? { ...group, row: { ...group.row, [name]: value } } : group));
  const reviewKey = (groupIndex: number, asset: Asset) => groupIndex + ":" + asset.id;
  const hostReviewKey = (groupIndex: number, asset: Asset) => "main:" + groupIndex + ":" + asset.id;
  const sameOwner = (left?: string, right?: string) => String(left || "").trim().toLocaleLowerCase() === String(right || "").trim().toLocaleLowerCase();
  const hostIsReady = (group: Group) => Boolean(group.host && (group.host.status === "UN_USED" || (group.host.status === "IN_USED" && sameOwner(group.host.owner, group.row.owner))));
  const hostWarningText = (group: Group) => {
    if (!group.host) return "Chưa tìm thấy Case PC/Laptop trên Main ASMS.";
    if (group.host.status === "IN_USED") return `Main ASMS đang gán cho Owner “${group.host.owner || "chưa có Owner"}”, khác Owner trên ticket.`;
    return `Main ASMS có Status ${group.host.status || "chưa có Status"}; cần kiểm tra trước khi cập nhật.`;
  };
  const needsReview = (asset: Asset) => ["BROKEN", "MAINTENANCE", "IN_USED"].includes(asset.status);
  const mustSkip = (asset: Asset) => ["BROKEN", "MAINTENANCE"].includes(asset.status);
  const appliedComponents = (group: Group) => group.components.filter(asset => !mustSkip(asset));
  const ensureOwner = async (owner: string) => {
    let ownerId = masterId("OWNER", owner);
    if (owner && !ownerId) ownerId = (await call("/api/master-data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "OWNER", name: owner }) })).id;
    return ownerId;
  };
  const updateAsset = async (asset: Asset, group: Group, ownerId: string) => call("/api/assets/" + asset.id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ asmsBarcode: group.hostCode || null, ownerId: ownerId || null, locationId: masterId("LOCATION", group.row.location) || null, floorId: masterId("FLOOR", group.row.floor) || null, seatCode: group.row.seatCode || null, ticketId: ticket.ticketCode || link, status: "IN_USED", note: group.row.note || null, auditSource: "AUTO" }) });
  const updateMainAsset = async (asset: Asset, group: Group) => call("/api/main-asms/assets/" + asset.id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ description: group.row.mainDescription || asset.description || "", owner: group.row.owner || "", status: "IN_USED" }) });
  const discussionFor = (group: Group) => {
    const host = group.host;
    const lines = [`Case PC: ${host ? `${host.barcode} ${group.row.mainDescription || host.description || ""}`.trim() : group.hostCode || "Chưa tìm thấy Case PC"}`];
    if (group.row.owner) lines.push(`Owner: ${group.row.owner}`);
    const applied = appliedComponents(group);
    if (applied.length) { lines.push("Đã lắp linh kiện có thông tin sau:"); applied.forEach(asset => lines.push(`${asset.barcode} ${asset.description || ""}`.trim())); }
    else lines.push("Không có linh kiện được cấp thêm.");
    if (group.missing.length) lines.push(`Chưa tìm thấy trên Sub-ASMS: ${group.missing.join("; ")}`);
    if (group.row.seatCode) lines.push(`Seatcode: ${group.row.seatCode}`);
    if (group.row.owner) lines.push(`Anh/chị ${group.row.owner} vui lòng thực hiện xác nhận tại Link`);
    return lines.join("\n");
  };
  const applyAll = async () => {
    if (!ticket || !groups.length) return;
    setBusy(true);
    let currentGroups: Group[];
    try { currentGroups = await analyse(ticket, groups.map(group => group.row)); }
    catch (error: any) { setBusy(false); return notify(error.message); }
    const invalid = currentGroups.filter(group => !group.hostCode || !group.host || group.missing.length);
    if (invalid.length) { setBusy(false); return notify("Dữ liệu chưa hợp lệ. Hãy sửa Barcode PC hoặc Note, sau đó bấm Kiểm tra lại trước khi áp dụng."); }
    const hostWarnings = currentGroups.flatMap((group, groupIndex) => group.host && !hostIsReady(group) && !confirmedCodes[hostReviewKey(groupIndex, group.host)] ? [group.host] : []);
    if (hostWarnings.length) { setBusy(false); return notify("Admin cần xác nhận các cảnh báo Case PC/Laptop trên Main ASMS trước khi đồng bộ: " + hostWarnings.map(item => item.barcode).join("; ")); }
    const unchecked = currentGroups.flatMap((group, groupIndex) => group.components.filter(needsReview).filter(asset => !confirmedCodes[reviewKey(groupIndex, asset)]));
    if (unchecked.length) { setBusy(false); return notify("Admin cần xác nhận các linh kiện ngoại lệ trước khi đồng bộ: " + unchecked.map(item => item.barcode).join("; ")); }
    try {
      const comments: string[] = [];
      for (const group of currentGroups) {
        const ownerId = await ensureOwner(group.row.owner || "");
        if (group.host) await updateMainAsset(group.host, group);
        for (const component of appliedComponents(group)) await updateAsset(component, group, ownerId);
        comments.push(discussionFor(group));
      }
      const discussion = parseDiscussion(ticket.flowData?.DISCUSSION);
      discussion.unshift({ id: crypto.randomUUID(), content: comments.join("\n\n---\n\n"), createdAt: new Date().toISOString(), author: "Sub-ASMS" });
      const flowData = { ...ticket.flowData, DISCUSSION: { items: JSON.stringify(discussion) }, TICKET_ASMS: { status: "DONE", completedAt: new Date().toISOString() } };
      const updated = await call("/api/portal/tickets/" + ticket.id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ flowData, updatedBy: "Sub-ASMS" }) });
      setTicket(updated); await refresh(); await loadPending(); window.dispatchEvent(new Event("tickets-changed")); notify("Đã đồng bộ tài sản và gửi comment vào Discussion của Portal.");
    } catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };

  return <section className="ticket-workspace">
    {mode === "my" ? <div className="panel"><div className="panel-head"><div><h2>My Ticket</h2><p className="muted">Các ticket Portal có Output đang chờ Sub-ASMS xử lý.</p></div><span className="ticket-count">{pending.length}</span></div>{pending.length ? <div className="ticket-pending-list">{pending.map(item => <button className={"ticket-pending " + (ticket?.id === item.id ? "active" : "")} key={item.id} onClick={() => openPending(item)}><b>{item.ticketCode}</b><span>{item.flowData?.ADMIN_PROCESS?.outputRows ? "Có Output cần xử lý" : "Đang chờ"}</span></button>)}</div> : <div className="empty">Không có ticket cần xử lý.</div>}</div> : <div className="panel"><div className="panel-head"><div><h2>Đọc ticket</h2><p className="muted">Dán link hoặc mã ticket Portal. Ticket đã nằm trong My Ticket sẽ không được tạo trùng.</p></div></div><div className="portal-read"><input value={link} onChange={event => setLink(event.target.value)} placeholder="Dán link hoặc mã ticket" /><button className="button" disabled={busy} onClick={readPortal}><Link size={16} />Đọc Output</button></div></div>}
    {ticket && <div className="panel ticket-output">
      <div className="panel-head"><div><h2>Đồng bộ ticket: {ticket.ticketCode}</h2><p className="muted">Chỉnh sửa dữ liệu, kiểm tra lại nguồn hiện tại, rồi mới áp dụng.</p></div><div className="ticket-actions"><button className="button secondary" disabled={busy} onClick={() => analyse(ticket, groups.map(group => group.row))}><CheckCircle2 size={16} />Kiểm tra lại</button><button className="button" disabled={busy} onClick={applyAll}><Truck size={16} />Approve / Submit</button></div></div>
      <div className="sync-group-list">{groups.map((group, index) => <article className="sync-group" key={index}>
        <div className="sync-group-head"><b>Owner / Case {index + 1}</b>{group.host && hostIsReady(group) && <span className="sync-ready"><CheckCircle2 size={14} />{group.host.status === "UN_USED" ? "UN_USED — sẵn sàng" : "IN_USED — Owner trùng khớp"}</span>}{group.host && !hostIsReady(group) && <span className="sync-warning"><AlertTriangle size={14} />Cần kiểm tra Main ASMS</span>}</div>
        <div className="sync-grid sync-grid-wide"><label>Owner<input value={group.row.owner || ""} onChange={event => updateGroup(index, "owner", event.target.value)} /></label><label>Barcode PC (CA-/LAP-)<input value={group.row.barcode || ""} onChange={event => updateGroup(index, "barcode", event.target.value)} /></label><label>Seatcode<input value={group.row.seatCode || ""} onChange={event => updateGroup(index, "seatCode", event.target.value)} /></label><label>Location<input value={group.row.location || ""} onChange={event => updateGroup(index, "location", event.target.value)} /></label><label>Floor<input value={group.row.floor || ""} onChange={event => updateGroup(index, "floor", event.target.value)} /></label><label className="sync-wide-field">Main ASMS Description<input value={group.row.mainDescription || ""} onChange={event => updateGroup(index, "mainDescription", event.target.value)} placeholder="Description sẽ cập nhật vào Main ASMS" /></label><label className="sync-wide-field">Note / linh kiện<input value={group.row.note || ""} onChange={event => updateGroup(index, "note", event.target.value)} placeholder="RAM-00005; RAM-00006" /></label></div>
        <div className="sync-assets"><p><b>Case PC trên Main ASMS:</b> {group.hostCode || "Không có mã CA-/LAP-"} {group.host ? `— ${group.host.description || ""} · ${group.host.status} · ${group.host.owner || "chưa có Owner"}` : group.hostCode ? "— chưa có trên Main ASMS" : ""}</p>{group.host && !hostIsReady(group) && <label className="component-review IN_USED"><input type="checkbox" checked={Boolean(confirmedCodes[hostReviewKey(index, group.host)])} onChange={event => setConfirmedCodes(current => ({ ...current, [hostReviewKey(index, group.host!)]: event.target.checked }))} /><span><b>{group.host.barcode}</b> — {hostWarningText(group)} Xác nhận để tiếp tục.</span></label>}<p><b>Linh kiện từ Note:</b> {group.componentCodes.join("; ") || "Không có"}</p>{group.components.filter(needsReview).map(asset => <label className={"component-review " + asset.status} key={asset.id}><input type="checkbox" checked={Boolean(confirmedCodes[reviewKey(index, asset)])} onChange={event => setConfirmedCodes(current => ({ ...current, [reviewKey(index, asset)]: event.target.checked }))} /><span><b>{asset.barcode}</b> — {asset.status === "IN_USED" ? "đang sử dụng: xác nhận để cập nhật và đồng bộ." : `${asset.status}: sẽ bỏ qua, không điều chuyển và không ghi vào Discussion.`}</span></label>)}{group.missing.length > 0 && <p className="missing"><AlertTriangle size={14} />Chưa thấy trên Sub-ASMS: {group.missing.join("; ")}</p>}<p className="discussion-preview"><PencilLine size={14} />Discussion sẽ gửi: {discussionFor(group)}</p></div>
      </article>)}</div>
      <p className="muted"><Send size={14} /> Case PC/Laptop chỉ đạt khi Main ASMS là UN_USED hoặc IN_USED với Owner trùng ticket. Các trường hợp khác cần Admin xác nhận. Linh kiện BROKEN/MAINTENANCE không điều chuyển, không xuất hiện trong Discussion; IN_USED cần Admin xác nhận.</p>
    </div>}
    <div className="panel ticket-guide"><ClipboardCheck size={18} /><div><b>Quy tắc bốc tách</b><p>Trong Barcode PC, chỉ lấy mã CA- hoặc LAP- làm Case PC; MO- và các loại khác tự bỏ qua. Mỗi mã linh kiện trong Note được phân tách bằng dấu chấm phẩy.</p></div></div>
  </section>;
}
