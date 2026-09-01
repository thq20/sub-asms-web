"use client";

const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const dataApiEnabled = Boolean(base && key);

async function rest(path: string, init: RequestInit = {}, prefer = "return=representation") {
  if (!base || !key) throw new Error("Chưa cấu hình Supabase Data API.");
  const response = await fetch(`${base}/rest/v1/${path}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: prefer, ...(init.headers || {}) } });
  const content = await response.text(); const body = content ? JSON.parse(content) : null;
  if (!response.ok) throw new Error(body?.message || body?.hint || "Không thể kết nối Supabase.");
  return body;
}

async function restPage(path: string) {
  if (!base || !key) throw new Error("Chưa cấu hình Supabase Data API.");
  const response = await fetch(`${base}/rest/v1/${path}`, { headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "count=exact" } });
  const content = await response.text(), body = content ? JSON.parse(content) : [];
  if (!response.ok) throw new Error(body?.message || body?.hint || "Không thể kết nối Supabase.");
  const total = Number(response.headers.get("content-range")?.split("/")[1]);
  return { items: body, total: Number.isFinite(total) ? total : body.length };
}

const id = () => crypto.randomUUID();
const nullable = (value: unknown) => value == null || value === "" ? null : String(value);
const now = () => new Date().toISOString();

function parseTicket(sourceText: string) {
  const rules: Record<string, RegExp> = { ticketCode: /(?:ticket|mã\s*ticket)\s*[:#-]?\s*([A-Z0-9-]+)/i, barcode: /(?:barcode|mã\s*tài\s*sản)\s*[:#-]?\s*([A-Z]{2,12}-\d{1,})/i, owner: /(?:owner|người\s*(?:sở\s*hữu|dùng))\s*[:#-]?\s*([^,;\n]+)/i, location: /(?:location|vị\s*trí)\s*[:#-]?\s*([^,;\n]+)/i, floor: /(?:floor|tầng)\s*[:#-]?\s*([^,;\n]+)/i, seatCode: /(?:seat\s*code|seatcode|chỗ\s*ngồi)\s*[:#-]?\s*([^,;\n]+)/i };
  return Object.fromEntries(Object.entries(rules).map(([name, regex]) => [name, sourceText.match(regex)?.[1]?.trim() || null]));
}

export async function dataApiCall(url: string, init: RequestInit = {}): Promise<any> {
  const method = (init.method || "GET").toUpperCase(), body = init.body ? JSON.parse(String(init.body)) : {};
  const [path, query = ""] = url.split("?"); const p = new URLSearchParams(query);

  if (path === "/api/dashboard") {
    const [recent, all, available, inUse, maintenance, broken, drafts] = await Promise.all([
      restPage("Asset?select=status,updatedAt,barcode,serialNumber,id&order=updatedAt.desc&limit=5"), restPage("Asset?select=id&limit=1"), restPage("Asset?select=id&status=eq.UN_USED&limit=1"), restPage("Asset?select=id&status=eq.IN_USED&limit=1"), restPage("Asset?select=id&status=eq.MAINTENANCE&limit=1"), restPage("Asset?select=id&status=eq.BROKEN&limit=1"), restPage("DraftTicket?select=id&status=eq.DRAFT&limit=1")
    ]);
    return { total: all.total, groups: { UN_USED: available.total, IN_USED: inUse.total, MAINTENANCE: maintenance.total, BROKEN: broken.total }, recent: recent.items, drafts: drafts.total };
  }
  if (path === "/api/master-data") {
    if (method === "GET") return rest("MasterData?active=eq.true&order=type.asc,name.asc");
    if (method === "POST") {
      const type = String(body.type || ""), name = String(body.name || "").trim();
      const lookup = () => rest(`MasterData?type=eq.${encodeURIComponent(type)}&name=eq.${encodeURIComponent(name)}&select=*`);
      const existing = await lookup(); if (existing[0]) return existing[0];
      try { return (await rest("MasterData", { method: "POST", body: JSON.stringify({ id: id(), type, name, code: nullable(body.code), active: true, createdAt: now(), updatedAt: now() }) }))[0]; }
      catch (error) { const concurrent = await lookup(); if (concurrent[0]) return concurrent[0]; throw error; }
    }
    if (method === "DELETE") return rest(`MasterData?id=eq.${encodeURIComponent(p.get("id") || "")}`, { method: "PATCH", body: JSON.stringify({ active: false, updatedAt: now() }) }, "return=minimal");
  }
  if (path === "/api/master-data/usage") {
    const fields: Record<string, string> = { LOCATION: "locationId", FLOOR: "floorId", OWNER: "ownerId", PURCHASING_UNIT: "purchasingUnitId", ASSET_TYPE: "assetTypeId" };
    const field = fields[p.get("type") || ""]; if (!field) throw new Error("Danh mục không hợp lệ.");
    const result = await rest(`Asset?select=id&${field}=eq.${encodeURIComponent(p.get("id") || "")}`); return { count: result.length };
  }
  if (path === "/api/filter-templates") {
    if (method === "GET") return rest("FilterTemplate?userId=eq.admin&order=updatedAt.desc");
    return (await rest("FilterTemplate?on_conflict=userId,templateName", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify({ id: id(), userId: "admin", templateName: body.templateName, filterCriteria: body.filterCriteria || {}, createdAt: now(), updatedAt: now() }) }))[0];
  }
  if (path.startsWith("/api/filter-templates/")) return rest(`FilterTemplate?id=eq.${encodeURIComponent(path.split("/").pop() || "")}`, { method: "DELETE" }, "return=minimal");
  if (path === "/api/portal/tickets") {
    if (method === "GET") return rest("PortalTicket?select=*&order=updatedAt.desc");
    const ticketCode = body.ticketCode || "PORTAL-" + new Date().toISOString().replace(/\D/g, "").slice(0, 14);
    return (await rest("PortalTicket", { method: "POST", body: JSON.stringify({ id: id(), ticketCode, currentStep: "REQUESTER", flowData: body.flowData || {}, createdAt: now(), updatedAt: now(), createdBy: "Requester", updatedBy: "Requester" }) }))[0];
  }
  if (path.startsWith("/api/portal/tickets/")) {
    const ticketId = encodeURIComponent(path.split("/").pop() || "");
    if (method === "GET") { const result = await rest(`PortalTicket?id=eq.${ticketId}&select=*`); if (!result[0]) throw new Error("Không tìm thấy ticket Portal."); return result[0]; }
    if (method === "PATCH") return (await rest(`PortalTicket?id=eq.${ticketId}`, { method: "PATCH", body: JSON.stringify({ ...body, updatedAt: now(), updatedBy: body.updatedBy || "Admin" }) }))[0];
  }
  if (path === "/api/tickets/read-portal") {
    const ticketId = String(body.ticketId || ""); if (!ticketId) throw new Error("Link ticket Portal không hợp lệ.");
    const ticket = (await rest(`PortalTicket?id=eq.${encodeURIComponent(ticketId)}&select=*`))[0]; if (!ticket) throw new Error("Không tìm thấy ticket trên Portal."); return ticket;
  }
  if (path === "/api/tickets") return rest("DraftTicket?order=createdAt.desc&limit=100");
  if (path === "/api/tickets/parse") { const parsedData = parseTicket(body.sourceText); return (await rest("DraftTicket", { method: "POST", body: JSON.stringify({ id: id(), sourceText: body.sourceText, ticketCode: parsedData.ticketCode, parsedData, status: "DRAFT", createdAt: now(), updatedAt: now() }) }))[0]; }
  if (path === "/api/assets/batch") return rest("rpc/asset_batch_create", { method: "POST", body: JSON.stringify({ payload: body }) });
  if (path === "/api/assets") {
    const filters = ["select=*", "order=updatedAt.desc"];
    if (p.get("q")) { const term = encodeURIComponent(`*${p.get("q")}*`); filters.push(`or=(barcode.ilike.${term},serialNumber.ilike.${term},asmsBarcode.ilike.${term},description.ilike.${term})`); }
    for (const field of ["status", "ownerId", "locationId", "assetTypeId"]) if (p.get(field)) filters.push(`${field}=eq.${encodeURIComponent(p.get(field) || "")}`);
    const page = Math.max(1, Number(p.get("page") || 1)), size = Math.min(100, Math.max(5, Number(p.get("size") || 10))), start = (page - 1) * size;
    const result = await restPage(`Asset?${filters.join("&")}&limit=${size}&offset=${start}`);
    return { ...result, page, size };
  }
  if (path.startsWith("/api/assets/")) {
    const assetId = encodeURIComponent(path.split("/").pop() || "");
    if (method === "PATCH") { const oldValues = (await rest(`Asset?id=eq.${assetId}&select=*`))[0]; if (!oldValues) throw new Error("Không tìm thấy tài sản."); const { auditSource = "MANUAL", ...assetValues } = body; const updated = (await rest(`Asset?id=eq.${assetId}`, { method: "PATCH", body: JSON.stringify({ ...assetValues, updatedAt: now(), updatedBy: "Admin" }) }))[0]; await rest("AuditLog", { method: "POST", body: JSON.stringify({ id: id(), entityName: "Asset", entityId: updated.id, actionType: "UPDATE", oldValues, newValues: updated, changedBy: "Admin", updateSource: auditSource, timestamp: now() }) }); return updated; }
    if (method === "DELETE") return rest(`Asset?id=eq.${assetId}`, { method: "DELETE" }, "return=minimal");
  }
  if (path.startsWith("/api/audit/")) return rest(`AuditLog?entityName=eq.Asset&entityId=eq.${encodeURIComponent(path.split("/").pop() || "")}&order=timestamp.desc`);
  throw new Error("Chức năng này chưa được hỗ trợ ở chế độ Data API.");
}
