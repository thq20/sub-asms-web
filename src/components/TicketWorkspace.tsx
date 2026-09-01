"use client";

import { useState } from "react";
import { ClipboardCheck, ExternalLink, Link, PencilLine, Truck } from "lucide-react";

type Master = { id: string; type: string; name: string };
type Output = Record<string, string>;
const editableFields: Array<[keyof Output, string, string]> = [
  ["owner", "Owner", "NguyenVanA"], ["location", "Location", "VietNam01"], ["floor", "Floor", "Floor 3"],
  ["serialNumber", "Serial Number", "SN-001"], ["assetType", "Asset Type", "Laptop"], ["seatCode", "Seat Code", "A3-15"],
  ["note", "Note", "Sub-ASMS: SSD-00001 đã gửi tài sản cho nhân viên"],
];

function subAsmsCode(note: string) {
  const tagged = note.match(/(?:sub[-\s]?asms(?:\s*(?:barcode|code))?|mã\s*sub[-\s]?asms|barcode)\s*[:#-]?\s*([a-z0-9]+-\d+)/i);
  return tagged?.[1]?.toUpperCase() || note.match(/[a-z]{2,12}-\d{1,}/i)?.[0]?.toUpperCase() || "";
}

export function TicketWorkspace({ call, master, notify, refresh }: { call: (url: string, init?: RequestInit) => Promise<any>; master: Master[]; notify: (message: string) => void; refresh: () => Promise<void> }) {
  const [link, setLink] = useState(""), [ticket, setTicket] = useState<any>(null), [draft, setDraft] = useState<Output>({}), [busy, setBusy] = useState(false);
  const readPortal = async () => {
    try {
      const id = link.includes("ticket=") ? new URL(link).searchParams.get("ticket") : link.trim();
      if (!id) return notify("Vui lòng dán link ticket Portal hợp lệ.");
      setBusy(true);
      const result = await call("/api/tickets/read-portal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ticketId: id }) });
      const output = result.flowData?.ADMIN_PROCESS || {}; setTicket(result); setDraft({ ...output, note: output.note || output.adminNote || "" }); notify("Đã đọc Output từ Portal. Bạn có thể chỉnh sửa trước khi điều chuyển.");
    } catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };
  const masterId = (type: string, value?: string) => master.find(item => item.type === type && item.name.toLocaleLowerCase() === (value || "").trim().toLocaleLowerCase())?.id || "";
  const applyOutput = async () => {
    try {
      const code = subAsmsCode(draft.note || "");
      if (!code) return notify("Note chưa chứa mã Sub-ASMS. Ví dụ: Sub-ASMS: SSD-00001");
      setBusy(true);
      const result = await call("/api/assets?size=10&page=1&q=" + encodeURIComponent(code));
      const asset = result.items.find((item: any) => String(item.barcode || "").toUpperCase() === code);
      if (!asset) return notify("Không tìm thấy tài sản có mã Sub-ASMS: " + code);
      let ownerId = masterId("OWNER", draft.owner);
      if (draft.owner && !ownerId) {
        const owner = await call("/api/master-data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "OWNER", name: draft.owner }) });
        ownerId = owner.id;
      }
      await call("/api/assets/" + asset.id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ownerId: ownerId || null, locationId: masterId("LOCATION", draft.location) || null, floorId: masterId("FLOOR", draft.floor) || null, seatCode: draft.seatCode || null, assetTypeId: masterId("ASSET_TYPE", draft.assetType) || null, serialNumber: draft.serialNumber || null, ticketId: ticket.ticketCode || link, status: "IN_USED", note: draft.note || null, auditSource: "AUTO" }) });
      await refresh(); notify("Đã điều chuyển " + code + " và ghi Nhật ký.");
    } catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };
  const code = subAsmsCode(draft.note || "");

  return <section className="ticket-workspace"><div className="panel"><div className="panel-head"><div><h2>Đọc ticket từ Portal</h2><p className="muted">Admin dán link ticket Portal, không dán nội dung text.</p></div><a href="/portal" className="button secondary" target="_blank"><ExternalLink size={16} />Mở Portal mô phỏng</a></div><div className="portal-read"><input value={link} onChange={event => setLink(event.target.value)} placeholder="Dán link: http://localhost:3100/portal?ticket=..." /><button className="button" disabled={busy} onClick={readPortal}><Link size={16} />Đọc Output</button></div></div>
    {ticket && <div className="panel ticket-output"><div className="panel-head"><div><h2>Output: {ticket.ticketCode}</h2><p className="muted">Kiểm tra và chỉnh sửa trước khi điều chuyển.</p></div><button className="button" disabled={busy} onClick={applyOutput}><Truck size={16} />Áp dụng điều chuyển</button></div><div className="transfer-key"><b>Mã Sub-ASMS đọc từ Note</b><code>{code || "Chưa tìm thấy mã"}</code><span>Định dạng đề xuất: Sub-ASMS: SSD-00001</span></div><div className="portal-output-form">{editableFields.map(([key, label, placeholder]) => <label key={key}>{label}<input value={draft[key] || ""} onChange={event => setDraft(current => ({ ...current, [key]: event.target.value }))} placeholder={placeholder} /></label>)}</div><p className="muted"><PencilLine size={14} /> Các chỉnh sửa tại đây chỉ áp dụng khi bấm “Áp dụng điều chuyển”; không ghi ngược lại Portal.</p></div>}
    <div className="panel ticket-guide"><ClipboardCheck size={18} /><div><b>Quy trình test</b><p>Portal: tạo ticket → Admin Process → điền Output, trong Admin Note ghi mã Sub-ASMS → Lưu → copy link. Sub-ASMS: dán link → chỉnh sửa nếu cần → Áp dụng điều chuyển.</p></div></div>
  </section>;
}
