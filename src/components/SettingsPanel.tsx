"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckSquare, Database, RotateCcw, Search, Settings2, Trash2, X } from "lucide-react";
import { dataApiCall } from "../lib/supabaseBrowser";
import { MASTER_LABEL } from "../lib/types";

type Master = { id: string; type: string; name: string; code?: string };
type InventoryRow = { id: string; source: "MAIN" | "SUB"; barcode: string; description?: string; owner?: string; status?: string };
const masterTypes = ["LOCATION", "FLOOR", "OWNER", "PURCHASING_UNIT", "MAIN_ASSET_TYPE", "SUB_ASSET_TYPE", "REQUEST_TYPE", "APPROVER", "TECHNICIAN", "SETUP_NOTE", "CLOSING_NOTE", "ASSET_TYPE", "PROCUREMENT_CODE"];

export function SettingsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [section, setSection] = useState<"master" | "reset">("master"), [master, setMaster] = useState<Master[]>([]), [type, setType] = useState("LOCATION"), [name, setName] = useState("");
  const [scope, setScope] = useState<"MAIN" | "SUB">("MAIN");
  const [rows, setRows] = useState<InventoryRow[]>([]), [selected, setSelected] = useState<Record<string, boolean>>({}), [query, setQuery] = useState(""), [busy, setBusy] = useState(false), [message, setMessage] = useState("");
  const notify = (value: string) => { setMessage(value); window.setTimeout(() => setMessage(""), 3000); };
  const loadMaster = async () => setMaster(await dataApiCall("/api/master-data"));
  const loadRows = async () => {
    const inventory = await dataApiCall("/api/inventory/list");
    setRows(inventory);
  };
  useEffect(() => { if (open) { loadMaster().catch(error => notify(error.message)); loadRows().catch(error => notify(error.message)); } }, [open]);
  const visible = useMemo(() => rows.filter(row => row.source === scope && (!query || [row.barcode, row.description, row.owner].some(value => String(value || "").toLowerCase().includes(query.toLowerCase())))), [rows, query, scope]);
  const addMaster = async () => {
    try {
      if (!name.trim()) return notify("Nhập tên danh mục.");
      setBusy(true);
      await dataApiCall("/api/master-data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, name: name.trim() }) });
      setName(""); await loadMaster(); window.dispatchEvent(new Event("master-data-changed")); notify("Đã lưu dữ liệu nền.");
    } catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };
  const removeMaster = async (item?: Master, group?: string) => {
    if (busy || (!item && !group)) return;
    const groupName = MASTER_LABEL[group || ""] || group;
    const count = master.filter(value => value.type === group).length;
    const question = item
      ? `Xóa giá trị “${item.name}”?`
      : `Xóa toàn bộ ${count} giá trị trong mục “${groupName}”? Mục “${groupName}” vẫn được giữ lại để thêm dữ liệu mới.`;
    if (!window.confirm(`${question}\nNếu có giá trị đang được tài sản sử dụng, thao tác sẽ bị hủy và không xóa giá trị nào.`)) return;
    try {
      setBusy(true);
      const queryString = item ? `id=${encodeURIComponent(item.id)}` : `type=${encodeURIComponent(group || "")}&all=true`;
      const result = await dataApiCall(`/api/master-data?${queryString}`, { method: "DELETE" });
      await loadMaster(); window.dispatchEvent(new Event("master-data-changed"));
      notify(item ? `Đã xóa ${result.removed || 0} giá trị.` : `Đã xóa ${result.removed || 0} giá trị trong mục “${groupName}”. Mục vẫn được giữ lại.`);
    } catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };
  const manage = async (action: "RESET" | "DELETE", all = false) => {
    if (busy) return;
    const picked = rows.filter(row => row.source === scope && (all || selected[row.source + row.id]));
    if (!picked.length) return notify("Chọn ít nhất một tài sản.");
    const title = scope === "MAIN" ? "Main ASMS" : "Sub-ASMS";
    if (!window.confirm(`${action === "DELETE" ? "Xóa vĩnh viễn" : "Reset về Store / UN_USED"} ${picked.length} tài sản ${title}?${all ? "\nÁp dụng toàn bộ danh sách, kể cả tài sản ngoài bộ lọc." : ""}${action === "DELETE" ? "\nLịch sử được giữ lại. Thao tác xóa không có nút hoàn tác." : ""}`)) return;
    try {
      setBusy(true);
      const result = await dataApiCall("/api/inventory/manage", { method: "POST", body: JSON.stringify({ scope, action, ids: picked.map(row => row.id) }) });
      setSelected({}); await loadRows(); window.dispatchEvent(new Event("inventory-changed"));
      notify(`Đã ${action === "DELETE" ? "xóa" : "reset"} ${result.count} tài sản ${title}.`);
    } catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };
  if (!open) return null;
  return <div className="settings-backdrop"><aside className="settings-panel"><header><div><Settings2 size={19} /><b>Setting</b></div><button onClick={onClose} aria-label="Đóng Setting"><X size={18} /></button></header><nav><button className={section === "master" ? "active" : ""} onClick={() => setSection("master")}><Database size={16} />Dữ liệu nền</button><button className={section === "reset" ? "active" : ""} onClick={() => setSection("reset")}><RotateCcw size={16} />Reset về kho</button></nav>{section === "master" ? <div className="settings-body"><h2>Dữ liệu nền dùng chung</h2><p className="muted">Asset Type được tách riêng cho Main ASMS và Sub-ASMS. Rê chuột vào tên để xóa từng giá trị, hoặc tiêu đề để xóa toàn bộ dữ liệu bên trong. Các mục luôn được giữ lại.</p><div className="settings-add"><select value={type} onChange={event => setType(event.target.value)}>{masterTypes.map(value => <option value={value} key={value}>{MASTER_LABEL[value] || value}</option>)}</select><input value={name} onChange={event => setName(event.target.value)} placeholder="Tên dữ liệu" /><button className="button" disabled={busy} onClick={addMaster}>Thêm</button></div><div className="settings-master-grid">{masterTypes.map(group => <section className="settings-master-section" key={group}><header><b>{MASTER_LABEL[group] || group}</b><button className="master-delete-group" disabled={busy || !master.some(item => item.type === group)} onClick={() => removeMaster(undefined, group)} title={`Xóa toàn bộ dữ liệu trong mục ${MASTER_LABEL[group] || group}`} aria-label={`Xóa toàn bộ dữ liệu trong mục ${MASTER_LABEL[group] || group}`}><Trash2 size={13} /></button></header><div>{master.filter(item => item.type === group).map(item => <span className="master-tag" key={item.id}>{item.name}<button disabled={busy} onClick={() => removeMaster(item)} title={`Xóa ${item.name}`}><Trash2 size={11} /></button></span>)}{!master.some(item => item.type === group) && <em>Chưa có dữ liệu</em>}</div></section>)}</div></div> : <div className="settings-body"><h2>Reset về kho / Xóa tài sản</h2><div className="inventory-scope" role="tablist" aria-label="Phạm vi tài sản">{(["MAIN", "SUB"] as const).map(value => <button key={value} role="tab" aria-selected={scope === value} className={scope === value ? "active" : ""} disabled={busy} onClick={() => { setScope(value); setSelected({}); setQuery(""); }}>{value === "MAIN" ? "Main ASMS" : "Sub-ASMS"} ({rows.filter(row => row.source === value).length})</button>)}</div><p className="muted">Thao tác chỉ áp dụng cho {scope === "MAIN" ? "Main ASMS" : "Sub-ASMS"} đang chọn.</p><div className="inventory-actions"><button className="button secondary" disabled={busy} onClick={() => manage("RESET")}>Reset đã chọn</button><button className="button secondary" disabled={busy} onClick={() => manage("RESET", true)}>Reset tất cả</button><button className="button danger" disabled={busy} onClick={() => manage("DELETE")}><Trash2 size={15} />Xóa đã chọn</button><button className="button danger" disabled={busy} onClick={() => manage("DELETE", true)}>Xóa tất cả</button></div><div className="settings-reset-tools"><label className="search"><Search size={15} /><input aria-label="Tìm tài sản trong Setting" value={query} onChange={event => setQuery(event.target.value)} /></label></div><div className="settings-rows"><label className="settings-row all"><input type="checkbox" disabled={busy} checked={visible.length > 0 && visible.every(row => selected[row.source + row.id])} onChange={event => setSelected(current => ({ ...current, ...Object.fromEntries(visible.map(row => [row.source + row.id, event.target.checked])) }))} /> Chọn tất cả đang hiển thị ({visible.length})</label>{visible.map(row => <label className="settings-row" key={row.source + row.id}><input type="checkbox" disabled={busy} checked={Boolean(selected[row.source + row.id])} onChange={event => setSelected(current => ({ ...current, [row.source + row.id]: event.target.checked }))} /><span className={"source " + row.source}>{row.source}</span><b>{row.barcode}</b><span>{row.description || "—"}</span><small>{row.owner || "—"} · {row.status}</small></label>)}</div></div>}{message && <div className="flash">{message}</div>}</aside></div>;
}
