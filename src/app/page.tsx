"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Archive, Boxes, ChevronLeft, ChevronRight, ClipboardList, Download, FileUp, FolderPlus, History, LayoutDashboard, LogOut, MonitorCog, Plus, Search, Settings2, Truck, Upload, X } from "lucide-react";
import { dataApiCall, dataApiEnabled } from "../lib/supabaseBrowser";
import { MASTER_LABEL, STATUS_LABEL } from "../lib/types";
import { TicketWorkspace } from "../components/TicketWorkspace";
import { AuthGate } from "../components/AuthGate";
import MainAsmsWorkspace from "./main-asms/page";
import PortalWorkspace from "./portal/page";
import { clearSession } from "../lib/supabaseAuth";
import { parseXlsxFile } from "../lib/xlsxClient";
import { createImportTemplate } from "../lib/xlsxTemplateClient";
import { SettingsPanel } from "../components/SettingsPanel";
import { TicketAsmsWorkspace } from "../components/TicketAsmsWorkspace";
import { ReportWorkspace } from "../components/ReportWorkspace";

type Master = { id: string; type: string; name: string };
type Asset = Record<string, any> & { id: string; barcode: string; status: string };
type Audit = { id: string; actionType: string; oldValues?: Record<string, any>; newValues?: Record<string, any>; changedBy: string; updateSource?: string; timestamp: string };
type Modal = "serials" | "transfer" | "audit" | "view" | "master-add" | "master-hide" | "import" | null;
const masterTypes = ["LOCATION", "FLOOR", "OWNER", "PURCHASING_UNIT", "ASSET_TYPE"];
const emptyAsset = () => ({ prefix: "SUB", quantity: 1, status: "UN_USED", asmsBarcode: "", invoiceId: "", serialNumber: "", description: "", originalCost: "", assetTypeId: "", locationId: "", floorId: "", ownerName: "", purchasingUnitId: "", seatCode: "", ticketId: "", purchaseDate: "", warrantyExpiry: "", warrantyMonths: "", note: "" });
const labels: Record<string, string> = { barcode: "Barcode", serialNumber: "Serial Number", asmsBarcode: "ASMS Barcode", invoiceId: "Invoice ID", description: "Description", originalCost: "Original Cost", assetTypeId: "Asset Type", locationId: "Location", floorId: "Floor", ownerId: "Owner", purchasingUnitId: "Purchasing Unit", seatCode: "Seat Code", ticketId: "Ticket", note: "Note", status: "Status" };
const ignored = new Set(["id", "prefix", "quantity", "createdAt", "updatedAt", "createdBy", "updatedBy"]);
const optionalValue = (value: unknown) => {
  const cleaned = typeof value === "string" ? value.trim() : value;
  return cleaned === "" || cleaned === undefined ? null : cleaned;
};
const parseDelimitedLine = (line: string, delimiter: string) => {
  const cells: string[] = []; let value = "", quoted = false;
  for (let index = 0; index < line.length; index++) {
    const char = line[index];
    if (char === '"') { if (quoted && line[index + 1] === '"') { value += '"'; index++; } else quoted = !quoted; }
    else if (char === delimiter && !quoted) { cells.push(value.trim()); value = ""; }
    else value += char;
  }
  cells.push(value.trim()); return cells;
};
const importField = (header: string) => {
  const key = header.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/gi, "").toLocaleLowerCase();
  const aliases: Record<string, string> = { prefix: "prefix", assettype: "assetType", loainguyencu: "assetType", serialnumber: "serialNumber", serial: "serialNumber", asmsbarcode: "asmsBarcode", barcodeasms: "asmsBarcode", maasms: "asmsBarcode", invoiceid: "invoiceId", invoice: "invoiceId", hoadon: "invoiceId", description: "description", mota: "description", originalcost: "originalCost", cost: "originalCost", giatri: "originalCost", nguyengia: "originalCost", location: "location", vitri: "location", floor: "floor", tang: "floor", owner: "owner", nguoisudung: "owner", purchasingunit: "purchasingUnit", seatcode: "seatCode", ticketid: "ticketId", ticket: "ticketId", status: "status", trangthai: "status", purchasedate: "purchaseDate", ngaymua: "purchaseDate", warrantyexpiry: "warrantyExpiry", hanbaohanh: "warrantyExpiry", note: "note", ghichu: "note" };
  return aliases[key] || header.trim();
};
const normalizeImportRow = (row: Record<string, string>) => Object.fromEntries(Object.entries(row).map(([header, value]) => [importField(header), value]));

type Workspace = "main-asms" | "sub-asms" | "portal" | "ticket";

export default function Home() { return <AuthGate><UnifiedWorkspace /></AuthGate>; }

function UnifiedWorkspace() {
  const [workspace, setWorkspace] = useState<Workspace>("sub-asms");
  const [ticketMode, setTicketMode] = useState<"my" | "read">("my"), [settingsOpen, setSettingsOpen] = useState(false), [pendingCount, setPendingCount] = useState(0);
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("view");
    if (value === "main-asms" || value === "sub-asms" || value === "portal" || value === "ticket") setWorkspace(value);
  }, []);
  const loadPending = async () => { try { const result = await dataApiCall("/api/tickets/pending"); setPendingCount(result.length); } catch { setPendingCount(0); } };
  useEffect(() => { loadPending(); window.addEventListener("tickets-changed", loadPending); return () => window.removeEventListener("tickets-changed", loadPending); }, []);
  const navigate = (next: Workspace) => {
    setWorkspace(next);
    const params = new URLSearchParams(window.location.search); params.set("view", next);
    window.history.replaceState({}, "", window.location.pathname + "?" + params.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const signOut = () => { clearSession(); window.location.reload(); };
  const openTicket = (mode: "my" | "read") => { setTicketMode(mode); navigate("ticket"); };
  return <div className="demo-app"><header className="demo-header"><a className="demo-brand" href="?view=sub-asms"><Archive size={20} /><span>Demo by QuanTH33</span></a><nav className="demo-tabs" aria-label="Các hệ thống demo"><button className={workspace === "main-asms" ? "active" : ""} onClick={() => navigate("main-asms")}><MonitorCog size={16} />Main ASMS</button><button className={workspace === "sub-asms" ? "active" : ""} onClick={() => navigate("sub-asms")}><Boxes size={16} />Sub-ASMS</button><button className={workspace === "portal" ? "active" : ""} onClick={() => navigate("portal")}><ClipboardList size={16} />Portal</button><div className="ticket-top-menu"><button className={workspace === "ticket" ? "active" : ""} onClick={() => openTicket("my")}><ClipboardList size={16} />Ticket ASMS{pendingCount > 0 && <em>{pendingCount}</em>}</button><div className="ticket-top-dropdown"><button onClick={() => openTicket("my")}>My Ticket</button><button onClick={() => openTicket("read")}>Đọc ticket</button></div></div></nav><button className="demo-settings" onClick={() => setSettingsOpen(true)} title="Setting"><Settings2 size={19} /></button><button className="demo-signout" onClick={signOut} title="Đăng xuất"><LogOut size={16} />Đăng xuất</button></header><div className="demo-workspace">{workspace === "main-asms" && <MainAsmsWorkspace />}{workspace === "sub-asms" && <HomeWorkspace />}{workspace === "portal" && <PortalWorkspace />}{workspace === "ticket" && <TicketAsmsWorkspace mode={ticketMode} />}</div><SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} /></div>;
}

function HomeWorkspace() {
  const [tab, setTab] = useState("dashboard"), [assets, setAssets] = useState<Asset[]>([]), [master, setMaster] = useState<Master[]>([]), [dash, setDash] = useState<any>({ groups: {} });
  const [query, setQuery] = useState(""), [search, setSearch] = useState(""), [mainBarcodeQuery, setMainBarcodeQuery] = useState(""), [subBarcodeQuery, setSubBarcodeQuery] = useState(""), [status, setStatus] = useState(""), [assetTypeId, setAssetTypeId] = useState(""), [locationId, setLocationId] = useState(""), [ownerId, setOwnerId] = useState(""), [page, setPage] = useState(1), [pageSize, setPageSize] = useState(10), [total, setTotal] = useState(0), [usage, setUsage] = useState<any>({ usedIds: [], utilizeIds: [] });
  const [modal, setModal] = useState<Modal>(null), [form, setForm] = useState<any>(emptyAsset()), [serialLines, setSerialLines] = useState(""), [selected, setSelected] = useState<Asset | null>(null), [audit, setAudit] = useState<Audit[]>([]);
  const [masterForm, setMasterForm] = useState({ type: "LOCATION", name: "", code: "" }), [pendingHide, setPendingHide] = useState<Master | null>(null), [flash, setFlash] = useState(""), [importReport, setImportReport] = useState("");
  const call = (url: string, init?: RequestInit) => dataApiEnabled ? dataApiCall(url, init) : fetch(url, init).then(async response => { const body = await response.json(); if (!response.ok) throw new Error(body.error || "Không thể xử lý yêu cầu."); return body; });
  const notify = (message: string) => { setFlash(message); window.setTimeout(() => setFlash(""), 3500); };
  const options = (type: string) => master.filter(item => item.type === type);
  const subAssetTypes = () => [...options("SUB_ASSET_TYPE"), ...options("ASSET_TYPE")];
  const nameFor = (id?: string | null) => master.find(item => item.id === id)?.name || id || "—";
  const formatValue = (field: string, value: any) => field.endsWith("Id") ? nameFor(value) : field === "status" ? STATUS_LABEL[value] || value : value == null || value === "" ? "—" : String(value);
  const setField = (field: string, value: any) => setForm((current: any) => ({ ...current, [field]: value }));

  const loadAll = async () => { try { const results = await Promise.all([call("/api/dashboard"), call("/api/master-data"), call("/api/assets/usage")]); setDash(results[0]); setMaster(results[1]); setUsage(results[2] || { usedIds: [], utilizeIds: [] }); } catch (error: any) { notify(error.message); } };
  const loadAssets = async () => {
    try {
      const params = new URLSearchParams({ page: String(page), size: String(pageSize) });
      if (search) params.set("q", search); if (mainBarcodeQuery) params.set("asms", mainBarcodeQuery); if (subBarcodeQuery) params.set("sub", subBarcodeQuery); if (status) params.set("status", status); if (assetTypeId) params.set("assetTypeId", assetTypeId); if (locationId) params.set("locationId", locationId); if (ownerId) params.set("ownerId", ownerId);
      const result = await call("/api/assets?" + params.toString()); setAssets(result.items); setTotal(result.total);
    } catch (error: any) { notify(error.message); }
  };
  useEffect(() => { loadAll(); const refresh = () => { loadAll(); loadAssets(); }; window.addEventListener("master-data-changed", refresh); window.addEventListener("inventory-changed", refresh); return () => { window.removeEventListener("master-data-changed", refresh); window.removeEventListener("inventory-changed", refresh); }; }, []);
  useEffect(() => { loadAssets(); }, [page, pageSize, search, mainBarcodeQuery, subBarcodeQuery, status, assetTypeId, locationId, ownerId]);

  const masterIdFor = async (type: string, value?: string) => {
    const name = String(value || "").trim(); if (!name) return "";
    const found = options(type).find(item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase()); if (found) return found.id;
    const created = await call("/api/master-data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, name }) });
    setMaster(items => (items.some(item => item.id === created.id) ? items : [...items, created].sort((a, b) => a.name.localeCompare(b.name)))); return created.id;
  };
  const ownerIdFor = (ownerName: string) => masterIdFor("OWNER", ownerName);
  const createAssets = async (serials: string[]) => {
    try {
      const ownerId = await ownerIdFor(form.ownerName || "");
      const warrantyExpiry = form.purchaseDate && Number(form.warrantyMonths) > 0 ? (() => { const date = new Date(form.purchaseDate + "T00:00:00"); date.setMonth(date.getMonth() + Number(form.warrantyMonths)); return date.toISOString().slice(0, 10); })() : optionalValue(form.warrantyExpiry);
      const payload = { ...form, asmsBarcode: optionalValue(form.asmsBarcode), invoiceId: optionalValue(form.invoiceId), description: optionalValue(form.description), assetTypeId: optionalValue(form.assetTypeId), locationId: optionalValue(form.locationId), floorId: optionalValue(form.floorId), purchasingUnitId: optionalValue(form.purchasingUnitId), seatCode: optionalValue(form.seatCode), ticketId: optionalValue(form.ticketId), purchaseDate: optionalValue(form.purchaseDate), warrantyExpiry, note: optionalValue(form.note), ownerId: optionalValue(ownerId), originalCost: form.originalCost === "" ? null : Number(form.originalCost), serialNumbers: serials };
      delete payload.ownerName; delete payload.serialNumber;
      await call("/api/assets/batch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setForm(emptyAsset()); setSerialLines(""); setTab("assets"); setPage(1); await Promise.all([loadAssets(), loadAll()]); notify("Đã tạo " + payload.quantity + " tài sản mới.");
    } catch (error: any) { notify(error.message); }
  };
  const beginCreate = () => {
    const qty = Math.max(1, Number(form.quantity) || 1);
    if (qty > 1) { setSerialLines(""); setModal("serials"); } else createAssets([form.serialNumber || ""]);
  };
  const saveSerials = async () => {
    const serials = serialLines.split(/\r?\n/).map(value => value.trim()).filter(Boolean), qty = Math.max(1, Number(form.quantity) || 1);
    if (serials.length !== qty) return notify("Cần quét đúng " + qty + " Serial Number, mỗi mã một dòng.");
    setModal(null); await createAssets(serials);
  };
  const openTransfer = (asset: Asset) => { setSelected(asset); setForm({ ...emptyAsset(), ...asset, originalCost: asset.originalCost ?? "", ownerName: nameFor(asset.ownerId) }); setModal("transfer"); };
  const saveTransfer = async () => {
    if (!selected) return;
    try {
      const ownerId = await ownerIdFor(form.ownerName || "");
      const payload = { status: form.status, locationId: form.locationId || null, floorId: form.floorId || null, ownerId: ownerId || null, purchasingUnitId: form.purchasingUnitId || null, seatCode: form.seatCode || null, description: form.description || null, originalCost: form.originalCost === "" ? null : Number(form.originalCost), assetTypeId: form.assetTypeId || null, purchaseDate: form.purchaseDate || null, warrantyExpiry: form.warrantyExpiry || null, note: form.note || null };
      await call("/api/assets/" + selected.id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setModal(null); await Promise.all([loadAssets(), loadAll()]); notify("Đã điều chuyển tài sản và ghi Nhật ký.");
    } catch (error: any) { notify(error.message); }
  };
  const openAudit = async (asset: Asset) => { setSelected(asset); setModal("audit"); try { setAudit(await call("/api/audit/" + asset.id)); } catch (error: any) { notify(error.message); } };
  const openView = (asset: Asset) => { setSelected(asset); setModal("view"); };
  const changes = (entry: Audit) => {
    if (entry.actionType === "CREATE") return ["Tạo mới tài sản."];
    const before = entry.oldValues || {}, after = entry.newValues || {};
    return Object.keys(after).filter(key => !ignored.has(key) && JSON.stringify(before[key] ?? null) !== JSON.stringify(after[key] ?? null)).map(key => (labels[key] || key) + ": " + formatValue(key, before[key]) + " → " + formatValue(key, after[key]));
  };
  const addMaster = async () => {
    try {
      if (!masterForm.name.trim()) return notify("Vui lòng nhập tên danh mục.");
      const created = await call("/api/master-data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(masterForm) });
      setMaster(items => [...items, created].sort((a, b) => (a.type + a.name).localeCompare(b.type + b.name))); setMasterForm({ type: "LOCATION", name: "", code: "" }); setModal(null); notify("Đã thêm dữ liệu nền.");
    } catch (error: any) { notify(error.message); }
  };
  const requestHide = async (item: Master) => {
    try {
      const usage = await call("/api/master-data/usage?id=" + encodeURIComponent(item.id) + "&type=" + item.type);
      if (usage.count) return notify("Không thể ẩn " + item.name + ": đang có " + usage.count + " tài sản sử dụng danh mục này.");
      setPendingHide(item); setModal("master-hide");
    } catch (error: any) { notify(error.message); }
  };
  const hideMaster = async () => { if (!pendingHide) return; try { await call("/api/master-data?id=" + pendingHide.id, { method: "DELETE" }); setMaster(items => items.filter(item => item.id !== pendingHide.id)); setPendingHide(null); setModal(null); notify("Đã ẩn dữ liệu nền."); } catch (error: any) { notify(error.message); } };
  const findMaster = (type: string, name?: string) => options(type).find(item => item.name.toLocaleLowerCase() === (name || "").trim().toLocaleLowerCase())?.id || "";
  const downloadTemplate = async () => {
    try {
      const url = URL.createObjectURL(createImportTemplate(master)), link = document.createElement("a"); link.href = url; link.download = "sub-asms-import-template.xlsx"; link.click(); URL.revokeObjectURL(url);
    } catch (error: any) { notify(error.message); }
  };
  const importFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    let rows: Record<string, string>[] = [];
    if (file.name.toLowerCase().endsWith(".xlsx")) {
      rows = (await parseXlsxFile(file)).rows;
    } else {
      const lines = (await file.text()).replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) return notify("File import không có dữ liệu.");
      const commaColumns = parseDelimitedLine(lines[0], ",").length, semicolonColumns = parseDelimitedLine(lines[0], ";").length, delimiter = semicolonColumns > commaColumns ? ";" : ",";
      const headers = parseDelimitedLine(lines[0], delimiter);
      rows = lines.slice(1).map(line => { const cells = parseDelimitedLine(line, delimiter); return Object.fromEntries(headers.map((key, index) => [key, cells[index] || ""])); });
    }
    rows = rows.map(normalizeImportRow);
    if (!rows.length) return notify("File import không có dữ liệu.");
    const [existing, currentMaster] = await Promise.all([call("/api/assets?page=1&size=10000"), call("/api/master-data")]);
    const usedSerialNumbers = new Set((existing.items || []).map((asset: Asset) => String(asset.serialNumber || "").trim().toLocaleLowerCase()).filter(Boolean));
    const importedMasterIds = new Map<string, string>((currentMaster as Master[]).map(item => [item.type + ":" + item.name.trim().toLocaleLowerCase(), item.id]));
    const importMasterId = async (type: string, value?: string) => {
      const name = String(value || "").trim(), key = type + ":" + name.toLocaleLowerCase();
      if (!name) return "";
      if (importedMasterIds.has(key)) return importedMasterIds.get(key) || "";
      try {
        const created = await call("/api/master-data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, name }) });
        importedMasterIds.set(key, created.id); setMaster(items => items.some(item => item.id === created.id) ? items : [...items, created]); return created.id;
      } catch (error) {
        const refreshed = await call("/api/master-data"), found = (refreshed as Master[]).find(item => item.type === type && item.name.trim().toLocaleLowerCase() === name.toLocaleLowerCase());
        if (found) { importedMasterIds.set(key, found.id); return found.id; }
        throw error;
      }
    };
    let done = 0; const errors: string[] = [];
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index] || {};
      try {
        const asmsBarcode = optionalValue(row.asmsBarcode), serialNumber = optionalValue(row.serialNumber);
        if (typeof serialNumber === "string" && usedSerialNumbers.has(serialNumber.toLocaleLowerCase())) throw new Error("Serial Number '" + serialNumber + "' đã tồn tại.");
        const [ownerId, assetTypeId, locationId, floorId, purchasingUnitId] = await Promise.all([importMasterId("OWNER", row.owner), importMasterId("SUB_ASSET_TYPE", row.assetType), importMasterId("LOCATION", row.location), importMasterId("FLOOR", row.floor), importMasterId("PURCHASING_UNIT", row.purchasingUnit)]);
        await call("/api/assets/batch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prefix: "SUB", quantity: 1, serialNumbers: [serialNumber], asmsBarcode, invoiceId: optionalValue(row.invoiceId), description: optionalValue(row.description), originalCost: optionalValue(row.originalCost) ? Number(String(row.originalCost).replace(/,/g, "")) : null, assetTypeId: optionalValue(assetTypeId), locationId: optionalValue(locationId), floorId: optionalValue(floorId), ownerId: optionalValue(ownerId), purchasingUnitId: optionalValue(purchasingUnitId), seatCode: optionalValue(row.seatCode), ticketId: optionalValue(row.ticketId), status: String(optionalValue(row.status) || "UN_USED"), purchaseDate: optionalValue(row.purchaseDate), warrantyExpiry: optionalValue(row.warrantyExpiry), note: optionalValue(row.note) }) });
        if (typeof serialNumber === "string") usedSerialNumbers.add(serialNumber.toLocaleLowerCase());
        done++;
      } catch (error: any) { errors.push("Dòng " + (index + 2) + ": " + error.message); }
    }
    setImportReport("Đã import " + done + "/" + rows.length + " dòng." + (errors.length ? " " + errors.join(" | ") : "")); await Promise.all([loadAssets(), loadAll()]);
  };
  const exportAssets = async () => {
    try {
      const params = new URLSearchParams({ page: "1", size: "10000" }); if (search) params.set("q", search);
      const result = await call("/api/assets?" + params.toString()), headers = ["Barcode", "Asset Type", "Serial Number", "ASMS Barcode", "Original Cost", "Status", "Location", "Floor", "Owner", "Description"];
      const csv = [headers, ...result.items.map((asset: Asset) => [asset.barcode, nameFor(asset.assetTypeId), asset.serialNumber || "", asset.asmsBarcode || "", asset.originalCost || "", STATUS_LABEL[asset.status] || asset.status, nameFor(asset.locationId), nameFor(asset.floorId), nameFor(asset.ownerId), asset.description || ""])].map(row => row.map((value: any) => '"' + String(value).replace(/"/g, '""') + '"').join(",")).join("\n");
      const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" })), link = document.createElement("a"); link.href = url; link.download = "sub-asms-assets.csv"; link.click(); URL.revokeObjectURL(url);
    } catch (error: any) { notify(error.message); }
  };
  const count = (value: string) => dash.groups?.[value] || 0;

  const utilize = async (asset: Asset) => { try { await call("/api/assets/" + asset.id + "/utilize", { method: "POST" }); await Promise.all([loadAssets(), loadAll()]); notify("Đã đưa Purchasing Unit về Store."); } catch (error: any) { notify(error.message); } };
  return <div className="shell"><aside className="side"><div className="brand"><span><Archive size={20} /></span><div>Sub-ASMS<small>ASSET MANAGEMENT</small></div></div><nav>{[["dashboard", LayoutDashboard, "Tổng quan"], ["assets", Boxes, "Tài sản"], ["create", Plus, "Thêm mới"], ["report", History, "Báo cáo"]].map(([id, Icon, title]: any) => <button key={id} className={"nav " + (tab === id ? "active" : "")} onClick={() => setTab(id)}><Icon />{title}</button>)}</nav><footer>Sub-ASMS · v1.2</footer></aside>
    <main className="content"><header className="top"><div><p className="eyebrow">Quản lý vòng đời linh kiện IT</p><h1>{tab === "dashboard" ? "Tổng quan tài sản" : tab === "assets" ? "Tài sản" : tab === "create" ? "Thêm mới tài sản" : "Báo cáo"}</h1></div><button className="user"><span className="avatar">A</span>Admin</button></header>
      <section className={"tab " + (tab === "dashboard" ? "active" : "")}><div className="grid"><Metric text="Tổng tài sản" value={dash.total || 0} icon={<Boxes />} /><Metric text="Available" value={count("UN_USED")} icon={<Archive />} /><Metric text="In use" value={count("IN_USED")} color="blue" icon={<Truck />} /><Metric text="Maintenance" value={count("MAINTENANCE")} color="amber" icon={<History />} /></div><div className="split"><div className="panel"><div className="panel-head"><h2>Tài sản mới cập nhật</h2><button className="button secondary small" onClick={() => setTab("assets")}>Xem tất cả</button></div>{dash.recent?.length ? dash.recent.map((asset: Asset) => <div className="row" key={asset.id}><div><b className="mono">{asset.barcode}</b><br /><span className="muted">{asset.serialNumber || "No serial number"}</span></div><span className={"status " + asset.status}>{STATUS_LABEL[asset.status]}</span></div>) : <div className="empty">Chưa có tài sản.</div>}</div><div className="panel"><div className="panel-head"><h2>Tình trạng kho</h2><span className="muted">Live data</span></div>{["UN_USED", "IN_USED", "MAINTENANCE", "BROKEN"].map(value => <div className="row" key={value}><span>{STATUS_LABEL[value]}</span><b>{count(value)}</b></div>)}</div></div></section>
      <section className={"tab " + (tab === "assets" ? "active" : "")}><div className="panel"><div className="toolbar asset-search-toolbar"><input className="search" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === "Enter") { setSearch(query); setPage(1); } }} placeholder="Tìm chung: Description, Owner..." /><input className="search" value={mainBarcodeQuery} onChange={event => { setMainBarcodeQuery(event.target.value); setPage(1); }} placeholder="ASMS Barcode: CA-001;LAP-002" /><input className="search" value={subBarcodeQuery} onChange={event => { setSubBarcodeQuery(event.target.value); setPage(1); }} placeholder="Sub-Barcode: RAM-001;HDD-002" /><select className="select" value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}><option value="">All Status</option>{Object.entries(STATUS_LABEL).map(([value, title]) => <option value={value} key={value}>{title}</option>)}</select><select className="select" value={assetTypeId} onChange={event => { setAssetTypeId(event.target.value); setPage(1); }}><option value="">All Asset Types</option>{subAssetTypes().map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select><select className="select" value={locationId} onChange={event => { setLocationId(event.target.value); setPage(1); }}><option value="">All Buildings</option>{options("LOCATION").map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select><select className="select" value={ownerId} onChange={event => { setOwnerId(event.target.value); setPage(1); }}><option value="">All Owners</option>{options("OWNER").map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select><button className="button" onClick={() => { setSearch(query); setPage(1); }}><Search size={16} />Tìm kiếm</button>{(search || mainBarcodeQuery || subBarcodeQuery || status || assetTypeId || locationId || ownerId) && <button className="button secondary" onClick={() => { setQuery(""); setSearch(""); setMainBarcodeQuery(""); setSubBarcodeQuery(""); setStatus(""); setAssetTypeId(""); setLocationId(""); setOwnerId(""); setPage(1); }}>Xóa lọc</button>}<button className="button secondary" onClick={exportAssets}><Download size={16} />Excel</button><button className="button secondary" onClick={() => setModal("import")}><Upload size={16} />Import</button><button className="button" onClick={() => setTab("create")}><Plus size={16} />Thêm mới</button></div><div className="table-wrap"><table className="table"><thead><tr><th>Barcode Sub</th><th>Description</th><th>Owner</th><th>Status</th><th>Location</th><th>Seat Code</th><th>Ticket ID</th><th>Đã qua sử dụng</th><th></th></tr></thead><tbody>{assets.map(asset => <tr key={asset.id}><td><button className="barcode-link" onClick={() => openView(asset)}>{asset.barcode}</button>{asset.asmsBarcode && <><br /><span className="muted">{asset.asmsBarcode}</span></>}</td><td>{asset.description || "—"}</td><td>{nameFor(asset.ownerId)}</td><td><span className={"status " + asset.status}>{STATUS_LABEL[asset.status]}</span></td><td>{nameFor(asset.locationId)}<br /><span className="muted">{nameFor(asset.floorId)}</span></td><td>{asset.seatCode || "—"}</td><td>{asset.ticketId || "—"}</td><td>{usage.usedIds?.includes(asset.id) ? "Có" : "Chưa"}</td><td><div className="actions"><button className="button secondary small" onClick={() => openView(asset)}>View</button><button className="button secondary small" title="Nhật ký" onClick={() => openAudit(asset)}><History size={15} /></button><button className="button secondary small" title="Điều chuyển" onClick={() => openTransfer(asset)}><Truck size={15} /></button><button className="button secondary small" disabled={!usage.utilizeIds?.includes(asset.id)} title={!usage.utilizeIds?.includes(asset.id) ? "Chỉ mở sau 6 tháng ở Store và chưa có lịch sử điều chuyển" : "Đưa về kho tận dụng"} onClick={() => utilize(asset)}>Utilize</button></div></td></tr>)}</tbody></table>{!assets.length && <div className="empty">Không tìm thấy tài sản phù hợp.</div>}</div><div className="pagination"><span>{total} tài sản</span><div className="page-controls"><label>Hiển thị <select className="select small-select" value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1); }}>{[10, 20, 30, 50, 100].map(size => <option value={size} key={size}>{size}</option>)}</select></label><button className="button secondary small" disabled={page === 1} onClick={() => setPage(current => current - 1)}><ChevronLeft size={15} />Trước</button><span>Trang {page}</span><button className="button secondary small" disabled={page * pageSize >= total} onClick={() => setPage(current => current + 1)}>Sau<ChevronRight size={15} /></button></div></div></div></section>
      <section className={"tab " + (tab === "create" ? "active" : "")}><div className="panel"><div className="panel-head"><div><h2>Nhập mới tài sản</h2><p className="muted">Tạo một tài sản hoặc lô; Serial Number lô được scan ở bước tiếp theo.</p></div><button className="button secondary" onClick={() => setModal("import")}><FileUp size={16} />Import template</button></div><AssetFields form={form} setField={setField} master={master} includeBatch /><div className="modal-actions"><button className="button" onClick={beginCreate}><Plus size={16} />{Number(form.quantity) > 1 ? "Tiếp tục nhập Serial Number" : "Tạo tài sản"}</button></div></div></section>
      <section className={"tab " + (tab === "master" ? "active" : "")}><div className="panel"><div className="panel-head"><div><h2>Danh mục dùng chung</h2><p className="muted">Chỉ có thể ẩn danh mục khi không có tài sản đang sử dụng.</p></div><button className="button" onClick={() => setModal("master-add")}><FolderPlus size={16} />Nhập danh mục</button></div><div className="master-grid">{masterTypes.map(type => <div className="master-item" key={type}><h3>{MASTER_LABEL[type]}</h3>{options(type).length ? options(type).map(item => <span className="tag" key={item.id}>{item.name}<button title="Ẩn danh mục" onClick={() => requestHide(item)}><X size={12} /></button></span>) : <span className="muted">Chưa có dữ liệu</span>}</div>)}</div></div></section>
      <section className={"tab " + (tab === "report" ? "active" : "")}><ReportWorkspace call={call} master={master} notify={notify} /></section>
      {modal === "serials" && <Dialog title={"Quét " + form.quantity + " Serial Number"} onClose={() => setModal(null)}><p className="hint">Dán hoặc scan mỗi Serial Number trên một dòng. Enter khi scan chỉ tạo dòng mới, không lưu dữ liệu.</p><textarea className="ticket-text" autoFocus value={serialLines} onChange={event => setSerialLines(event.target.value)} onKeyDown={event => { if (event.key === "Enter") event.stopPropagation(); }} placeholder={"SN-001\nSN-002\nSN-003"} /><span className="muted">Đã nhận: {serialLines.split(/\r?\n/).filter(Boolean).length}/{form.quantity}</span><div className="modal-actions"><button className="button secondary" onClick={() => setModal(null)}>Hủy</button><button className="button" onClick={saveSerials}>Save</button></div></Dialog>}
      {modal === "transfer" && <Dialog title="Điều chuyển tài sản" subtitle={selected?.barcode} onClose={() => setModal(null)}><AssetFields form={form} setField={setField} master={master} /><div className="modal-actions"><button className="button secondary" onClick={() => setModal(null)}>Hủy</button><button className="button" onClick={saveTransfer}>Lưu điều chuyển</button></div></Dialog>}
      {modal === "audit" && <Dialog title="Nhật ký" subtitle={selected?.barcode} onClose={() => setModal(null)}>{audit.length ? audit.map(entry => <div className="audit" key={entry.id}><b>{entry.actionType === "CREATE" ? "Tạo tài sản" : "Điều chuyển / cập nhật"}</b><span className={"audit-source " + (entry.updateSource || "MANUAL")}>{entry.updateSource === "AUTO" ? "AUTO" : "MANUAL"}</span><span className="muted"> · {entry.changedBy} · {new Date(entry.timestamp).toLocaleString("vi-VN")}</span>{changes(entry).map(change => <div className="audit-change" key={change}>{change}</div>)}</div>) : <div className="empty">Chưa có Nhật ký.</div>}</Dialog>}
      {modal === "master-add" && <Dialog title="Nhập danh mục" onClose={() => setModal(null)}><div className="form"><label>Danh mục<select value={masterForm.type} onChange={event => setMasterForm(current => ({ ...current, type: event.target.value }))}>{masterTypes.map(type => <option value={type} key={type}>{MASTER_LABEL[type]}</option>)}</select></label><label>Tên<input autoFocus value={masterForm.name} onChange={event => setMasterForm(current => ({ ...current, name: event.target.value }))} placeholder="Ví dụ: VietNam01" /></label><label className="wide">Code (optional)<input value={masterForm.code} onChange={event => setMasterForm(current => ({ ...current, code: event.target.value }))} /></label></div><div className="modal-actions"><button className="button secondary" onClick={() => setModal(null)}>Hủy</button><button className="button" onClick={addMaster}>Xác nhận thêm</button></div></Dialog>}
      {modal === "master-hide" && <Dialog title="Xác nhận ẩn danh mục" onClose={() => setModal(null)}><p>Bạn có chắc muốn ẩn <b>{pendingHide?.name}</b> khỏi danh mục {pendingHide ? MASTER_LABEL[pendingHide.type] : ""}?</p><div className="modal-actions"><button className="button secondary" onClick={() => setModal(null)}>Hủy</button><button className="button danger" onClick={hideMaster}>Xác nhận ẩn</button></div></Dialog>}
      {modal === "import" && <Dialog title="Import tài sản theo template" onClose={() => setModal(null)}><p className="hint">Mỗi dòng là một tài sản. Cột không áp dụng có thể để trống; hệ thống lưu giá trị trống, không dùng giá trị rỗng trùng lặp.</p><div className="modal-actions import-actions"><button className="button secondary" onClick={downloadTemplate}><Download size={16} />Tải template</button><label className="button"><Upload size={16} />Chọn file Excel/CSV<input type="file" accept=".xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv" onChange={importFile} /></label></div>{importReport && <div className="import-report">{importReport}</div>}</Dialog>}
      {modal === "view" && selected && <AssetViewDialog asset={selected} master={master} onClose={() => setModal(null)} />}{flash && <div className="flash">{flash}</div>}
    </main></div>;
}

function formatCost(value: any) { const digits = String(value || "").replace(/[^0-9]/g, ""); return digits ? Number(digits).toLocaleString("en-US") : ""; }
function Metric({ text, value, icon, color = "" }: { text: string; value: any; icon: any; color?: string }) { return <div className={"metric " + color}><div className="label">{text}<span className="ic">{icon}</span></div><div className="value">{value}</div></div>; }
function Dialog({ title, subtitle, children, onClose }: { title: string; subtitle?: string; children: any; onClose: () => void }) { return <div className="modal-bg"><div className="modal"><div className="panel-head"><div><h2>{title}</h2>{subtitle && <p className="hint">{subtitle}</p>}</div><button className="button secondary small" onClick={onClose}><X size={16} /></button></div>{children}</div></div>; }
function AssetFields({ form, setField, master, includeBatch = false }: { form: any; setField: (field: string, value: any) => void; master: Master[]; includeBatch?: boolean }) {
  const options = (type: string) => master.filter(item => item.type === type);
  const subAssetTypes = [...options("SUB_ASSET_TYPE"), ...options("ASSET_TYPE")];
  const warrantyDate = form.purchaseDate && Number(form.warrantyMonths) > 0 ? (() => { const date = new Date(form.purchaseDate + "T00:00:00"); date.setMonth(date.getMonth() + Number(form.warrantyMonths)); return date.toLocaleDateString("vi-VN"); })() : "Tự tính từ ngày mua";
  return <div className="form">{includeBatch && <label>Quantity<input type="number" min="1" max="500" value={form.quantity} onChange={event => setField("quantity", Math.max(1, Number(event.target.value) || 1))} /></label>}{(!includeBatch || Number(form.quantity) === 1) && <label>Serial Number<input value={form.serialNumber || ""} onChange={event => setField("serialNumber", event.target.value)} /></label>}<SelectField text="Asset Type" value={form.assetTypeId} onChange={(value: string) => setField("assetTypeId", value)} items={subAssetTypes} /><label>Original Cost<input inputMode="numeric" value={formatCost(form.originalCost)} onChange={event => setField("originalCost", event.target.value.replace(/[^0-9]/g, ""))} placeholder="0" /></label><label>Invoice ID<input value={form.invoiceId || ""} onChange={event => setField("invoiceId", event.target.value)} /></label><label>Purchase Date<input type="date" value={form.purchaseDate || ""} onChange={event => setField("purchaseDate", event.target.value)} /></label><label>Warranty months<input type="number" min="0" value={form.warrantyMonths || ""} onChange={event => setField("warrantyMonths", event.target.value)} /></label><label>Warranty Expiry<input readOnly value={warrantyDate} /></label><label>Status<select value={form.status || "UN_USED"} onChange={event => setField("status", event.target.value)}>{Object.entries(STATUS_LABEL).map(([value, title]) => <option value={value} key={value}>{title}</option>)}</select></label><SelectField text="Building" value={form.locationId} onChange={(value: string) => setField("locationId", value)} items={options("LOCATION")} /><SelectField text="Floor" value={form.floorId} onChange={(value: string) => setField("floorId", value)} items={options("FLOOR")} /><SelectField text="Owner" value={form.ownerId || ""} onChange={(value: string) => { setField("ownerId", value); setField("ownerName", options("OWNER").find(item => item.id === value)?.name || ""); }} items={options("OWNER")} /><SelectField text="Purchasing Unit" value={form.purchasingUnitId} onChange={(value: string) => setField("purchasingUnitId", value)} items={options("PURCHASING_UNIT")} /><label>Seat Code<input value={form.seatCode || ""} onChange={event => setField("seatCode", event.target.value)} /></label><label className="wide">Description<textarea value={form.description || ""} onChange={event => setField("description", event.target.value)} /></label><label className="wide">Note<textarea value={form.note || ""} onChange={event => setField("note", event.target.value)} /></label></div>;
}
function SelectField({ text, value, onChange, items }: { text: string; value: string; onChange: (value: string) => void; items: Master[] }) { return <label>{text}<select value={value || ""} onChange={event => onChange(event.target.value)}><option value="">Not selected</option>{items.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>; }
function AssetViewDialog({ asset, master, onClose }: { asset: Asset; master: Master[]; onClose: () => void }) {
  const nameFor = (id?: string | null) => master.find(item => item.id === id)?.name || id || "—";
  const rows = [["Asset Type", nameFor(asset.assetTypeId)], ["Serial Number", asset.serialNumber || "—"], ["ASMS Barcode", asset.asmsBarcode || "—"], ["Invoice ID", asset.invoiceId || "—"], ["Original Cost", asset.originalCost ? Number(asset.originalCost).toLocaleString("vi-VN") : "—"], ["Purchase Date", asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString("vi-VN") : "—"], ["Warranty Expiry", asset.warrantyExpiry ? new Date(asset.warrantyExpiry).toLocaleDateString("vi-VN") : "—"], ["Floor", nameFor(asset.floorId)], ["Purchasing Unit", nameFor(asset.purchasingUnitId)], ["Note", asset.note || "—"]];
  return <Dialog title="Thông tin tài sản" subtitle={asset.barcode} onClose={onClose}><div className="asset-detail-grid">{rows.map(([label, value]) => <div key={label}><b>{label}</b><span>{value}</span></div>)}</div></Dialog>;
}
