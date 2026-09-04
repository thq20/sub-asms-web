"use client";

const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const dataApiEnabled = Boolean(base && key);
const accessToken = () => {
  if (typeof window === "undefined") return "";
  try { return JSON.parse(window.localStorage.getItem("sub-asms-auth-session") || "null")?.access_token || ""; } catch { return ""; }
};

async function rest(path: string, init: RequestInit = {}, prefer = "return=representation") {
  if (!base || !key) throw new Error("Chưa cấu hình Supabase Data API.");
  const response = await fetch(`${base}/rest/v1/${path}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${accessToken() || key}`, "Content-Type": "application/json", Prefer: prefer, ...(init.headers || {}) } });
  const content = await response.text(); const body = content ? JSON.parse(content) : null;
  if (!response.ok) throw new Error(body?.message || body?.hint || "Không thể kết nối Supabase.");
  return body;
}

async function restPage(path: string) {
  if (!base || !key) throw new Error("Chưa cấu hình Supabase Data API.");
  const response = await fetch(`${base}/rest/v1/${path}`, { headers: { apikey: key, Authorization: `Bearer ${accessToken() || key}`, "Content-Type": "application/json", Prefer: "count=exact" } });
  const content = await response.text(), body = content ? JSON.parse(content) : [];
  if (!response.ok) throw new Error(body?.message || body?.hint || "Không thể kết nối Supabase.");
  const total = Number(response.headers.get("content-range")?.split("/")[1]);
  return { items: body, total: Number.isFinite(total) ? total : body.length };
}

const id = () => crypto.randomUUID();
const nullable = (value: unknown) => value == null || value === "" ? null : String(value);
const now = () => new Date().toISOString();
const codeList = (value = "") => [...new Set(String(value).split(/[;,]/).map(item => item.trim().toUpperCase()).filter(Boolean))];
const mainBarcodePrefix = (assetType = "") => {
  const normalized = String(assetType).trim().toLowerCase();
  if (normalized === "case pc") return "CA";
  if (normalized === "laptop") return "LAP";
  if (normalized === "monitor") return "MO";
  const fallback = normalized.replace(/[^a-z0-9]/g, "").toUpperCase().slice(0, 3);
  return fallback || "ASSET";
};
async function nextMainBarcode(assetType: string, used = new Set<string>()) {
  const prefix = mainBarcodePrefix(assetType), records = await rest("PortalTicket?select=ticketCode&ticketCode=like.MAIN-ASMS-" + encodeURIComponent(prefix) + "-*");
  const values = records.map((record: any) => Number(String(record.ticketCode || "").match(new RegExp("^MAIN-ASMS-" + prefix + "-(\\d+)$"))?.[1] || 0));
  let value = Math.max(0, ...values) + 1, barcode = "";
  do { barcode = prefix + "-" + String(value++).padStart(5, "0"); } while (used.has(barcode));
  used.add(barcode); return barcode;
}

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
      const existing = await lookup();
      if (existing[0]) {
        if (!existing[0].active) return (await rest(`MasterData?id=eq.${encodeURIComponent(existing[0].id)}`, { method: "PATCH", body: JSON.stringify({ active: true, updatedAt: now() }) }))[0];
        return existing[0];
      }
      try { return (await rest("MasterData", { method: "POST", body: JSON.stringify({ id: id(), type, name, code: nullable(body.code), active: true, createdAt: now(), updatedAt: now() }) }))[0]; }
      catch (error) { const concurrent = await lookup(); if (concurrent[0]) return concurrent[0]; throw error; }
    }
    if (method === "DELETE") {
      const requestedType = String(p.get("type") || ""), requestedId = String(p.get("id") || ""), removeAll = p.get("all") === "true";
      const items = removeAll ? await rest(`MasterData?type=eq.${encodeURIComponent(requestedType)}&active=eq.true&select=*`) : await rest(`MasterData?id=eq.${encodeURIComponent(requestedId)}&active=eq.true&select=*`);
      if (!items.length) return { removed: 0 };
      const ids = new Set(items.map((item: any) => item.id));
      const assetTypeItems = items.filter((item: any) => ["ASSET_TYPE", "SUB_ASSET_TYPE"].includes(item.type));
      if (assetTypeItems.length) { const linked = await rest("Asset?select=id,assetTypeId"); if (linked.some((asset: any) => ids.has(asset.assetTypeId))) throw new Error("Không thể xóa: Asset Type đang được ít nhất một tài sản Sub-ASMS sử dụng."); }
      for (const item of items.filter((item: any) => item.type === "MAIN_ASSET_TYPE")) { const main = await rest("PortalTicket?select=flowData&ticketCode=like.MAIN-ASMS-*"); if (main.some((record: any) => String(record.flowData?.MAIN_ASSET?.assetType || "").trim().toLowerCase() === String(item.name).trim().toLowerCase())) throw new Error("Không thể xóa: Asset Type đang được ít nhất một tài sản Main ASMS sử dụng."); }
      const checks: Record<string, string> = { LOCATION: "locationId", FLOOR: "floorId", OWNER: "ownerId", PURCHASING_UNIT: "purchasingUnitId" };
      for (const item of items) { const field = checks[item.type]; if (field) { const linked = await rest(`Asset?select=id&${field}=eq.${encodeURIComponent(item.id)}&limit=1`); if (linked[0]) throw new Error("Không thể xóa: " + item.name + " đang được tài sản sử dụng."); } }
      await Promise.all(items.map((item: any) => rest(`MasterData?id=eq.${encodeURIComponent(item.id)}`, { method: "PATCH", body: JSON.stringify({ active: false, updatedAt: now() }) }, "return=minimal")));
      return { removed: items.length };
    }
  }
  if (path === "/api/master-data/usage") {
    const fields: Record<string, string> = { LOCATION: "locationId", FLOOR: "floorId", OWNER: "ownerId", PURCHASING_UNIT: "purchasingUnitId", ASSET_TYPE: "assetTypeId", SUB_ASSET_TYPE: "assetTypeId" };
    const field = fields[p.get("type") || ""]; if (!field) throw new Error("Danh mục không hợp lệ.");
    const result = await rest(`Asset?select=id&${field}=eq.${encodeURIComponent(p.get("id") || "")}`); return { count: result.length };
  }
  if (path === "/api/filter-templates") {
    if (method === "GET") return rest("FilterTemplate?userId=eq.admin&order=updatedAt.desc");
    return (await rest("FilterTemplate?on_conflict=userId,templateName", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify({ id: id(), userId: "admin", templateName: body.templateName, filterCriteria: body.filterCriteria || {}, createdAt: now(), updatedAt: now() }) }))[0];
  }
  if (path.startsWith("/api/filter-templates/")) return rest(`FilterTemplate?id=eq.${encodeURIComponent(path.split("/").pop() || "")}`, { method: "DELETE" }, "return=minimal");
  if (path === "/api/main-asms/assets") {
    if (method === "GET") {
      const records = await rest("PortalTicket?select=*&ticketCode=like.MAIN-ASMS-*&order=updatedAt.desc");
      const term = String(p.get("q") || "").trim().toLocaleLowerCase();
      return records.map((record: any) => ({ id: record.id, ...(record.flowData?.MAIN_ASSET || {}), updatedAt: record.updatedAt })).filter((asset: any) => !term || [asset.barcode, asset.description, asset.assetType, asset.owner, asset.location, asset.status].some(value => String(value || "").toLocaleLowerCase().includes(term)));
    }
    const asset = { barcode: String(body.barcode || "").trim().toUpperCase(), description: String(body.description || "").trim(), assetType: String(body.assetType || "").trim(), owner: String(body.owner || "").trim(), location: String(body.location || "").trim(), status: String(body.status || "UN_USED"), updatedAt: now() };
    if (!asset.description || !asset.assetType) throw new Error("Main ASMS yêu cầu Asset Type và Description.");
    if (!asset.barcode) asset.barcode = await nextMainBarcode(asset.assetType);
    const duplicated = await rest(`PortalTicket?ticketCode=eq.${encodeURIComponent("MAIN-ASMS-" + asset.barcode)}&select=id`); if (duplicated[0]) throw new Error("Barcode đã có trong Main ASMS mẫu.");
    const record = (await rest("PortalTicket", { method: "POST", body: JSON.stringify({ id: id(), ticketCode: "MAIN-ASMS-" + asset.barcode, currentStep: "MAIN_ASMS", flowData: { MAIN_ASSET: asset }, createdAt: now(), updatedAt: now(), createdBy: "Main ASMS", updatedBy: "Main ASMS" }) }))[0];
    return { id: record.id, ...asset };
  }
  if (path === "/api/main-asms/batch" && method === "POST") {
    const assets = Array.isArray(body.assets) ? body.assets : [];
    if (!assets.length) throw new Error("Chưa có tài sản để nhập.");
    const records = await rest("PortalTicket?select=ticketCode&ticketCode=like.MAIN-ASMS-*");
    const known = new Set(records.map((item: any) => String(item.ticketCode).replace(/^MAIN-ASMS-/, "").toUpperCase()));
    const batch = new Set<string>();
    for (const item of assets) {
      const barcode = String(item.barcode || "").trim().toUpperCase();
      if (known.has(barcode) || batch.has(barcode)) throw new Error("Barcode '" + barcode + "' đã tồn tại hoặc bị trùng trong lô nhập.");
      if (barcode) batch.add(barcode);
    }
    const created = [];
    for (const item of assets) {
      const asset = { barcode: String(item.barcode || "").trim().toUpperCase(), description: String(item.description || "").trim(), assetType: String(item.assetType || "").trim(), owner: String(item.owner || "").trim(), location: String(item.location || "").trim(), status: String(item.status || "UN_USED"), updatedAt: now() };
      if (!asset.description || !asset.assetType) throw new Error("Main ASMS yêu cầu Asset Type và Description.");
      if (!asset.barcode) asset.barcode = await nextMainBarcode(asset.assetType, batch);
      const record = (await rest("PortalTicket", { method: "POST", body: JSON.stringify({ id: id(), ticketCode: "MAIN-ASMS-" + asset.barcode, currentStep: "MAIN_ASMS", flowData: { MAIN_ASSET: asset }, createdAt: now(), updatedAt: now(), createdBy: "Main ASMS", updatedBy: "Main ASMS" }) }))[0];
      created.push({ id: record.id, ...asset });
    }
    return created;
  }
  if (path.startsWith("/api/main-asms/assets/")) {
    const assetId = encodeURIComponent(path.split("/").pop() || "");
    if (method === "PATCH") {
      const old = (await rest(`PortalTicket?id=eq.${assetId}&select=*`))[0]; if (!old) throw new Error("Không tìm thấy dữ liệu Main ASMS.");
      const asset = { ...(old.flowData?.MAIN_ASSET || {}), ...body, barcode: String(body.barcode || old.flowData?.MAIN_ASSET?.barcode || "").trim().toUpperCase(), updatedAt: now() };
      const updated = (await rest(`PortalTicket?id=eq.${assetId}`, { method: "PATCH", body: JSON.stringify({ ticketCode: "MAIN-ASMS-" + asset.barcode, flowData: { ...old.flowData, MAIN_ASSET: asset }, updatedAt: now(), updatedBy: "Main ASMS" }) }))[0];
      return { id: updated.id, ...asset };
    }
  }
  if (path === "/api/portal/tickets") {
    if (method === "GET") return (await rest("PortalTicket?select=*&order=updatedAt.desc")).filter((item: any) => !String(item.ticketCode || "").startsWith("MAIN-ASMS-"));
    const ticketCode = body.ticketCode || "PORTAL-" + new Date().toISOString().replace(/\D/g, "").slice(0, 14);
    return (await rest("PortalTicket", { method: "POST", body: JSON.stringify({ id: id(), ticketCode, currentStep: "REQUESTER", flowData: body.flowData || {}, createdAt: now(), updatedAt: now(), createdBy: "Requester", updatedBy: "Requester" }) }))[0];
  }
  if (path.startsWith("/api/portal/tickets/")) {
    const ticketId = encodeURIComponent(path.split("/").pop() || "");
    if (method === "GET") { const result = await rest(`PortalTicket?id=eq.${ticketId}&select=*`); if (!result[0]) throw new Error("Không tìm thấy ticket Portal."); return result[0]; }
    if (method === "PATCH") return (await rest(`PortalTicket?id=eq.${ticketId}`, { method: "PATCH", body: JSON.stringify({ ...body, updatedAt: now(), updatedBy: body.updatedBy || "Admin" }) }))[0];
    if (method === "DELETE") return rest(`PortalTicket?id=eq.${ticketId}`, { method: "DELETE" }, "return=minimal");
  }
  if (path === "/api/tickets/pending") {
    const tickets = await rest("PortalTicket?select=*&order=updatedAt.desc");
    const items = tickets.filter((ticket: any) => !String(ticket.ticketCode || "").startsWith("MAIN-ASMS-") && ticket.flowData?.ADMIN_PROCESS?.outputRows && ticket.flowData?.TICKET_ASMS?.status !== "DONE");
    return items;
  }
  if (path === "/api/tickets/read-portal") {
    const ticketId = String(body.ticketId || "").trim(); if (!ticketId) throw new Error("Link ticket Portal không hợp lệ.");
    const byId = await rest(`PortalTicket?id=eq.${encodeURIComponent(ticketId)}&select=*`);
    const ticket = byId[0] || (await rest(`PortalTicket?ticketCode=eq.${encodeURIComponent(ticketId)}&select=*`))[0]; if (!ticket) throw new Error("Không tìm thấy ticket trên Portal."); return ticket;
  }
  if (path === "/api/tickets") return rest("DraftTicket?order=createdAt.desc&limit=100");
  if (path === "/api/tickets/parse") { const parsedData = parseTicket(body.sourceText); return (await rest("DraftTicket", { method: "POST", body: JSON.stringify({ id: id(), sourceText: body.sourceText, ticketCode: parsedData.ticketCode, parsedData, status: "DRAFT", createdAt: now(), updatedAt: now() }) }))[0]; }
  if (path === "/api/assets/batch") return rest("rpc/asset_batch_create", { method: "POST", body: JSON.stringify({ payload: body }) });
  if (path === "/api/assets") {
    const filters = ["select=*", "order=updatedAt.desc"];
    if (p.get("q")) { const term = encodeURIComponent(`*${p.get("q")}*`); filters.push(`or=(barcode.ilike.${term},serialNumber.ilike.${term},asmsBarcode.ilike.${term},description.ilike.${term})`); }
    const subCodes = codeList(p.get("sub") || ""), mainCodes = codeList(p.get("asms") || "");
    if (subCodes.length) filters.push(`barcode=in.(${subCodes.map(encodeURIComponent).join(",")})`);
    if (mainCodes.length) filters.push(`asmsBarcode=in.(${mainCodes.map(encodeURIComponent).join(",")})`);
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
  if (path === "/api/assets/usage") {
    const [assets, audits, master] = await Promise.all([rest("Asset?select=*"), rest("AuditLog?select=entityId,oldValues,newValues"), rest("MasterData?select=id,name")]);
    const names = new Map(master.map((item: any) => [item.id, String(item.name || "").toLowerCase()]));
    const wasTransferred = new Set((audits || []).filter((log: any) => {
      const before = log.oldValues || {}, after = log.newValues || {}; const owner = after.ownerId || before.ownerId;
      return owner && names.get(owner) !== "store";
    }).map((log: any) => log.entityId));
    const sixMonthsAgo = new Date(); sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const usedIds = assets.filter((asset: any) => wasTransferred.has(asset.id) && Boolean(asset.ticketId) && names.get(asset.purchasingUnitId) !== "store").map((asset: any) => asset.id);
    const utilizeIds = assets.filter((asset: any) => !wasTransferred.has(asset.id) && asset.purchaseDate && new Date(asset.purchaseDate) <= sixMonthsAgo && names.get(asset.purchasingUnitId) !== "store").map((asset: any) => asset.id);
    return { usedIds, utilizeIds };
  }
  if (path === "/api/inventory/reset" && method === "POST") {
    const stores = await rest("MasterData?type=eq.OWNER&name=eq.Store&select=*");
    const store = stores[0] || (await rest("MasterData", { method: "POST", body: JSON.stringify({ id: id(), type: "OWNER", name: "Store", active: true, createdAt: now(), updatedAt: now() }) }))[0];
    const subIds: string[] = body.all || body.scope === "SUB" ? (await rest("Asset?select=id")).map((asset: any) => asset.id) : (body.subIds || []);
    const mainIds: string[] = body.all || body.scope === "MAIN" ? (await rest("PortalTicket?select=id&ticketCode=like.MAIN-ASMS-*")).map((asset: any) => asset.id) : (body.mainIds || []);
    for (const assetId of subIds) {
      const oldValues = (await rest(`Asset?id=eq.${encodeURIComponent(assetId)}&select=*`))[0]; if (!oldValues) continue;
      const updated = (await rest(`Asset?id=eq.${encodeURIComponent(assetId)}`, { method: "PATCH", body: JSON.stringify({ ownerId: store.id, status: "UN_USED", updatedAt: now(), updatedBy: "Reset về kho" }) }))[0];
      await rest("AuditLog", { method: "POST", body: JSON.stringify({ id: id(), entityName: "Asset", entityId: assetId, actionType: "RESET", oldValues, newValues: updated, changedBy: "Admin", updateSource: "MANUAL", timestamp: now() }) });
    }
    for (const assetId of mainIds) {
      const old = (await rest(`PortalTicket?id=eq.${encodeURIComponent(assetId)}&select=*`))[0]; if (!old) continue;
      const asset = { ...(old.flowData?.MAIN_ASSET || {}), owner: "Store", status: "UN_USED", updatedAt: now() };
      await rest(`PortalTicket?id=eq.${encodeURIComponent(assetId)}`, { method: "PATCH", body: JSON.stringify({ flowData: { ...old.flowData, MAIN_ASSET: asset }, updatedAt: now(), updatedBy: "Reset về kho" }) });
    }
    return { sub: subIds.length, main: mainIds.length };
  }
  if (path.startsWith("/api/assets/") && path.endsWith("/utilize") && method === "POST") {
    const assetId = encodeURIComponent(path.split("/")[3] || "");
    const stores = await rest("MasterData?type=eq.PURCHASING_UNIT&name=eq.Store&select=*");
    const store = stores[0] || (await rest("MasterData", { method: "POST", body: JSON.stringify({ id: id(), type: "PURCHASING_UNIT", name: "Store", active: true, createdAt: now(), updatedAt: now() }) }))[0];
    const oldValues = (await rest(`Asset?id=eq.${assetId}&select=*`))[0]; if (!oldValues) throw new Error("Không tìm thấy tài sản.");
    const updated = (await rest(`Asset?id=eq.${assetId}`, { method: "PATCH", body: JSON.stringify({ purchasingUnitId: store.id, updatedAt: now(), updatedBy: "Utilize" }) }))[0];
    await rest("AuditLog", { method: "POST", body: JSON.stringify({ id: id(), entityName: "Asset", entityId: updated.id, actionType: "UTILIZE", oldValues, newValues: updated, changedBy: "Admin", updateSource: "MANUAL", timestamp: now() }) });
    return updated;
  }
  if (path.startsWith("/api/audit/")) return rest(`AuditLog?entityName=eq.Asset&entityId=eq.${encodeURIComponent(path.split("/").pop() || "")}&order=timestamp.desc`);
  throw new Error("Chức năng này chưa được hỗ trợ ở chế độ Data API.");
}
