"use client";

import { Copy, Database, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { dataApiCall } from "../../lib/supabaseBrowser";

type MainAsset = { id: string; barcode: string; description: string; assetType?: string; owner?: string; location?: string; status?: string };
type Master = { id: string; type: string; name: string };
type MainEntry = { barcode: string; description: string; assetType: string; owner: string; location: string; status: string };
const blankEntry = (): MainEntry => ({ barcode: "", description: "", assetType: "", owner: "", location: "", status: "UN_USED" });

function MainAsmsWorkspace() {
  const [assets, setAssets] = useState<MainAsset[]>([]), [rows, setRows] = useState<MainEntry[]>([blankEntry()]), [query, setQuery] = useState(""), [master, setMaster] = useState<Master[]>([]), [flash, setFlash] = useState(""), [busy, setBusy] = useState(false);
  const call = (url: string, init?: RequestInit) => dataApiCall(url, init);
  const notify = (message: string) => { setFlash(message); window.setTimeout(() => setFlash(""), 3500); };
  const values = (type: string) => master.filter(item => item.type === type).map(item => item.name);
  const load = async (search = query) => { try { setBusy(true); setAssets(await call("/api/main-asms/assets?q=" + encodeURIComponent(search))); } catch (error: any) { notify(error.message); } finally { setBusy(false); } };
  const loadMaster = async () => { try { setMaster(await call("/api/master-data")); } catch (error: any) { notify(error.message); } };
  useEffect(() => { load(""); loadMaster(); const refresh = () => { loadMaster(); load(); }; window.addEventListener("master-data-changed", refresh); window.addEventListener("inventory-changed", refresh); return () => { window.removeEventListener("master-data-changed", refresh); window.removeEventListener("inventory-changed", refresh); }; }, []);
  const options = useMemo(() => {
    const mainTypes = values("MAIN_ASSET_TYPE");
    const existingTypes = [...new Set(assets.map(asset => String(asset.assetType || "").trim()).filter(Boolean))];
    return { asset: mainTypes.length ? mainTypes : existingTypes, owner: values("OWNER"), building: values("LOCATION") };
  }, [master, assets]);
  const changeRow = (index: number, field: keyof MainEntry, value: string) => setRows(current => current.map((row, rowIndex) => rowIndex === index ? { ...row, [field]: value } : row));
  const cloneRow = (index: number) => setRows(current => [...current.slice(0, index + 1), { ...current[index], barcode: "" }, ...current.slice(index + 1)]);
  const removeRow = (index: number) => setRows(current => current.length === 1 ? current : current.filter((_, rowIndex) => rowIndex !== index));
  const addAssets = async () => {
    const entries = rows.filter(row => [row.barcode, row.description, row.assetType, row.owner, row.location].some(Boolean));
    if (!entries.length) return notify("Nhập ít nhất một tài sản.");
    if (entries.some(row => !row.assetType || !row.description.trim())) return notify("Mỗi dòng cần có Asset Type và Description.");
    try {
      setBusy(true);
      const created = await call("/api/main-asms/batch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ assets: entries }) });
      setAssets(current => [...created, ...current]); setRows([blankEntry()]); notify(`Đã thêm ${created.length} tài sản Main ASMS.`);
    } catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };
  return <div className="main-asms-shell"><main className="main-asms-content"><div className="main-asms-intro"><div><p className="portal-kicker">MAIN ASMS</p><h1>Danh sách tài sản Main ASMS</h1><p className="muted">Barcode chính, Asset Type, Description, Owner, Status và Building.</p></div><span><Database size={17} />{assets.length} tài sản</span></div><section className="panel main-asms-add"><div className="panel-head"><div><h2>Thêm tài sản</h2><p className="muted">Có thể Clone dòng để thêm nhiều tài sản. Để trống Barcode để hệ thống tự tạo theo Asset Type.</p></div></div><div className="main-entry-list">{rows.map((row, index) => <article className="main-entry-row" key={index}><span className="main-entry-number">#{index + 1}</span><label>Barcode<input value={row.barcode} onChange={event => changeRow(index, "barcode", event.target.value.toUpperCase())} placeholder="Tự tạo nếu để trống" /></label><Select label="Asset Type" values={options.asset} value={row.assetType} onChange={value => changeRow(index, "assetType", value)} /><label className="main-entry-description">Description<textarea rows={2} value={row.description} onChange={event => changeRow(index, "description", event.target.value)} /></label><Select label="Owner" values={options.owner} value={row.owner} onChange={value => changeRow(index, "owner", value)} /><label>Status<select value={row.status} onChange={event => changeRow(index, "status", event.target.value)}><option>UN_USED</option><option>IN_USED</option><option>BROKEN</option><option>MAINTENANCE</option></select></label><Select label="Building" values={options.building} value={row.location} onChange={value => changeRow(index, "location", value)} /><div className="main-entry-actions"><button className="button secondary small" type="button" onClick={() => cloneRow(index)} title="Clone dòng"><Copy size={14} />Clone</button>{rows.length > 1 && <button className="button secondary small delete-row" type="button" onClick={() => removeRow(index)} title="Xóa dòng"><Trash2 size={14} /></button>}</div></article>)}</div><div className="main-entry-footer"><button className="button secondary" type="button" onClick={() => setRows(current => [...current, blankEntry()])}>Thêm dòng trống</button><button className="button" type="button" disabled={busy} onClick={addAssets}><Plus size={16} />Thêm tài sản</button></div></section><section className="panel"><div className="panel-head"><h2>Tài sản</h2><div className="main-asms-search"><input className="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Barcode, Description, Owner..." /><button className="button secondary" onClick={() => load()} disabled={busy}><RefreshCw size={16} />Tìm</button></div></div><div className="table-wrap"><table className="table main-table"><thead><tr><th>Barcode</th><th>Asset Type</th><th>Description</th><th>Owner</th><th>Status</th><th>Building</th></tr></thead><tbody>{assets.length ? assets.map(asset => <tr key={asset.id}><td className="mono">{asset.barcode}</td><td>{asset.assetType || "—"}</td><td className="main-description-cell">{asset.description}</td><td>{asset.owner || "Store"}</td><td><span className={"status " + (asset.status || "UN_USED")}>{asset.status || "UN_USED"}</span></td><td>{asset.location || "—"}</td></tr>) : <tr><td colSpan={6} className="empty">Chưa có tài sản.</td></tr>}</tbody></table></div></section></main>{flash && <div className="flash">{flash}</div>}</div>;
}

function Select({ label, values, value, onChange }: { label: string; values: string[]; value: string; onChange: (value: string) => void }) { return <label>{label}<select value={value} onChange={event => onChange(event.target.value)}><option value="">Chọn {label}</option>{values.map(item => <option value={item} key={item}>{item}</option>)}</select></label>; }
export default MainAsmsWorkspace;
