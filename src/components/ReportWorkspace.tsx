"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Plus, RefreshCw, Trash2 } from "lucide-react";
import { createQuarterlyReportWorkbook, QuarterReportRow } from "../lib/xlsxReportClient";

type Asset = Record<string, any>;
const fields: Array<{ key: keyof QuarterReportRow; label: string; kind?: "date" | "number" }> = [
  { key: "assetType", label: "Loại tài sản" }, { key: "purchaseDate", label: "Ngày mua", kind: "date" }, { key: "invoiceInfo", label: "Thông tin hoá đơn" },
  { key: "procurementCode", label: "Code mua sắm" }, { key: "assetName", label: "Tên tài sản" }, { key: "unitPrice", label: "Đơn giá", kind: "number" },
  { key: "quantity", label: "Số lượng", kind: "number" }, { key: "owner", label: "Người sử dụng" }, { key: "purchasingUnit", label: "Đơn vị" },
  { key: "ticketId", label: "ID Ticket" }, { key: "usageDate", label: "Ngày sử dụng", kind: "date" }, { key: "note", label: "Note" }
];
const emptyRow = (): QuarterReportRow => ({ assetType: "", purchaseDate: "", invoiceInfo: "", procurementCode: "", assetName: "", unitPrice: null, quantity: 1, owner: "", purchasingUnit: "", ticketId: "", usageDate: "", note: "" });

export function ReportWorkspace({ call, master, notify }: { call: (url: string, init?: RequestInit) => Promise<any>; master: { id: string; type: string; name: string }[]; notify: (text: string) => void }) {
  const today = new Date(), [year, setYear] = useState(today.getFullYear()), [quarter, setQuarter] = useState(Math.floor(today.getMonth() / 3) + 1), [rows, setRows] = useState<QuarterReportRow[]>([]), [busy, setBusy] = useState(false);
  const nameFor = (id: string, fallback = "") => master.find(item => item.id === id)?.name || fallback;
  const load = async () => {
    try {
      setBusy(true);
      const [data, usage] = await Promise.all([call("/api/assets?page=1&size=10000"), call("/api/assets/usage")]);
      const start = new Date(Date.UTC(year, (quarter - 1) * 3, 1)), end = new Date(Date.UTC(year, quarter * 3, 1));
      const used = new Set<string>(usage?.usedIds || []), usedAt = usage?.usedAtById || {};
      const reportRows = (data.items || []).filter((asset: Asset) => {
        if (!used.has(asset.id)) return false;
        const date = new Date(usedAt[asset.id] || asset.updatedAt || "");
        return Number.isFinite(date.getTime()) && date >= start && date < end;
      }).map((asset: Asset): QuarterReportRow => ({
        assetType: nameFor(asset.assetTypeId), purchaseDate: String(asset.purchaseDate || "").slice(0, 10), invoiceInfo: asset.invoiceId || "", procurementCode: asset.procurementCode || "",
        assetName: asset.description || asset.barcode || "", unitPrice: asset.originalCost == null ? null : Number(asset.originalCost), quantity: Number(asset.quantity) || 1,
        owner: nameFor(asset.ownerId, "Store"), purchasingUnit: nameFor(asset.purchasingUnitId), ticketId: asset.ticketId || "", usageDate: String(usedAt[asset.id] || asset.updatedAt || "").slice(0, 10), note: asset.note || ""
      }));
      setRows(reportRows);
    } catch (error: any) { notify(error.message); } finally { setBusy(false); }
  };
  useEffect(() => { load(); }, [year, quarter, master.length]);
  const totalValue = useMemo(() => rows.reduce((sum, row) => sum + (Number(row.unitPrice) || 0) * (Number(row.quantity) || 0), 0), [rows]);
  const edit = (index: number, key: keyof QuarterReportRow, value: string) => setRows(current => current.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: key === "unitPrice" ? (value === "" ? null : Number(value)) : key === "quantity" ? Math.max(1, Number(value) || 1) : value } : row));
  const exportReport = () => {
    const url = URL.createObjectURL(createQuarterlyReportWorkbook(rows, year, quarter)), link = document.createElement("a");
    link.href = url; link.download = `bao-cao-sub-asms-Q${quarter}-${year}.xlsx`; link.click(); URL.revokeObjectURL(url);
  };
  return <section className="report-workspace panel"><div className="panel-head"><div><p className="portal-kicker">REPORT</p><h2>Báo cáo tài sản theo quý</h2><p className="muted">Danh sách tài sản bắt đầu sử dụng trong quý. Có thể sửa, thêm hoặc xóa dòng trước khi xuất Excel.</p></div><div className="report-actions"><select value={quarter} onChange={event => setQuarter(Number(event.target.value))}>{[1, 2, 3, 4].map(value => <option value={value} key={value}>Quý {value}</option>)}</select><input type="number" min="2000" max="2100" value={year} aria-label="Năm báo cáo" onChange={event => setYear(Number(event.target.value) || today.getFullYear())} /><button className="button secondary" disabled={busy} onClick={load}><RefreshCw size={16} />Làm mới</button><button className="button" onClick={exportReport}><Download size={16} />Xuất Excel</button></div></div><div className="report-metrics"><div><span>Kỳ báo cáo</span><b>Q{quarter}/{year}</b></div><div><span>Số dòng</span><b>{rows.length}</b></div><div><span>Tổng số lượng</span><b>{rows.reduce((sum, row) => sum + (Number(row.quantity) || 0), 0)}</b></div><div><span>Tổng giá trị</span><b>{totalValue.toLocaleString("vi-VN")}</b></div></div><div className="report-table-wrap table-wrap"><table className="table report-table"><thead><tr>{fields.map(field => <th key={field.key}>{field.label}</th>)}<th></th></tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{fields.map(field => <td key={field.key}><input type={field.kind === "date" ? "date" : field.kind === "number" ? "number" : "text"} min={field.key === "quantity" ? 1 : undefined} value={row[field.key] == null ? "" : String(row[field.key])} onChange={event => edit(rowIndex, field.key, event.target.value)} /></td>)}<td><button className="icon-button" aria-label={`Xóa dòng ${rowIndex + 1}`} onClick={() => setRows(current => current.filter((_, index) => index !== rowIndex))}><Trash2 size={15} /></button></td></tr>)}</tbody></table>{!rows.length && <p className="empty">Không có tài sản bắt đầu sử dụng trong quý đã chọn.</p>}</div><button className="button secondary small report-add-row" onClick={() => setRows(current => [...current, emptyRow()])}><Plus size={14} />Thêm dòng</button></section>;
}
