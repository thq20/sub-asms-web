type Master = { type?: string; name?: string };
const encoder = new TextEncoder();
const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const column = (index: number) => { let value = ""; for (let current = index + 1; current; current = Math.floor((current - 1) / 26)) value = String.fromCharCode(65 + (current - 1) % 26) + value; return value; };
const crcTable = (() => { const table = new Uint32Array(256); for (let value = 0; value < 256; value++) { let code = value; for (let bit = 0; bit < 8; bit++) code = code & 1 ? 0xedb88320 ^ (code >>> 1) : code >>> 1; table[value] = code >>> 0; } return table; })();
const crc32 = (bytes: Uint8Array) => { let code = 0xffffffff; for (const byte of bytes) code = crcTable[(code ^ byte) & 0xff] ^ (code >>> 8); return (code ^ 0xffffffff) >>> 0; };
const join = (parts: Uint8Array[]) => { const out = new Uint8Array(parts.reduce((length, part) => length + part.length, 0)); let offset = 0; for (const part of parts) { out.set(part, offset); offset += part.length; } return out; };

function zip(files: Array<{ name: string; text: string }>) {
  const locals: Uint8Array[] = [], central: Uint8Array[] = []; let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.name), data = encoder.encode(file.text), checksum = crc32(data), local = new Uint8Array(30), localView = new DataView(local.buffer);
    localView.setUint32(0, 0x04034b50, true); localView.setUint16(4, 20, true); localView.setUint32(14, checksum, true); localView.setUint32(18, data.length, true); localView.setUint32(22, data.length, true); localView.setUint16(26, name.length, true);
    locals.push(local, name, data);
    const entry = new Uint8Array(46), entryView = new DataView(entry.buffer);
    entryView.setUint32(0, 0x02014b50, true); entryView.setUint16(4, 20, true); entryView.setUint16(6, 20, true); entryView.setUint32(16, checksum, true); entryView.setUint32(20, data.length, true); entryView.setUint32(24, data.length, true); entryView.setUint16(28, name.length, true); entryView.setUint32(42, offset, true);
    central.push(entry, name); offset += local.length + name.length + data.length;
  }
  const directory = join(central), end = new Uint8Array(22), endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true); endView.setUint16(8, files.length, true); endView.setUint16(10, files.length, true); endView.setUint32(12, directory.length, true); endView.setUint32(16, offset, true);
  return join([...locals, directory, end]);
}

export function createImportTemplate(master: Master[]) {
  const names = (type: string) => master.filter(item => item.type === type && item.name?.trim()).map(item => item.name!.trim()).filter((name, index, values) => values.indexOf(name) === index);
  const listEntries = Object.entries({ assetType: names("ASSET_TYPE"), location: names("LOCATION"), floor: names("FLOOR"), owner: names("OWNER"), purchasingUnit: names("PURCHASING_UNIT"), status: ["UN_USED", "IN_USED", "MAINTENANCE", "BROKEN"] });
  const headers = ["prefix", "assetType", "serialNumber", "asmsBarcode", "invoiceId", "description", "originalCost", "location", "floor", "owner", "purchasingUnit", "seatCode", "ticketId", "status", "purchaseDate", "warrantyExpiry", "note"];
  const cells = headers.map((header, index) => `<c r="${column(index)}1" t="inlineStr"><is><t>${header}</t></is></c>`).join("");
  const listHeader = listEntries.map(([label], index) => `<c r="${column(index)}1" t="inlineStr"><is><t>${escapeXml(label)}</t></is></c>`).join("");
  const maxLength = Math.max(...listEntries.map(([, values]) => values.length), 1);
  const listRows = Array.from({ length: maxLength }, (_, row) => `<row r="${row + 2}">${listEntries.map(([, values], index) => values[row] ? `<c r="${column(index)}${row + 2}" t="inlineStr"><is><t>${escapeXml(values[row])}</t></is></c>` : "").join("")}</row>`).join("");
  const validationColumns: Record<string, number> = { B: 0, H: 1, I: 2, J: 3, K: 4, N: 5 };
  const validations = Object.entries(validationColumns).map(([cell, index]) => `<dataValidation type="list" allowBlank="1" sqref="${cell}2:${cell}200"><formula1>&apos;Lists&apos;!$${column(index)}$2:$${column(index)}$${Math.max(2, (listEntries[index][1] as string[]).length + 1)}</formula1></dataValidation>`).join("");
  const xml = {
    content: `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`,
    rels: `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    workbook: `<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Import Template" sheetId="1" r:id="rId1"/><sheet name="Lists" sheetId="2" state="hidden" r:id="rId2"/></sheets></workbook>`,
    workbookRels: `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/></Relationships>`,
    sheet1: `<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView showGridLines="0" workbookViewId="0"/></sheetViews><sheetData><row r="1">${cells}</row></sheetData><dataValidations count="6">${validations}</dataValidations></worksheet>`,
    sheet2: `<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData><row r="1">${listHeader}</row>${listRows}</sheetData></worksheet>`,
  };
  const files = [{ name: "[Content_Types].xml", text: xml.content }, { name: "_rels/.rels", text: xml.rels }, { name: "xl/workbook.xml", text: xml.workbook }, { name: "xl/_rels/workbook.xml.rels", text: xml.workbookRels }, { name: "xl/worksheets/sheet1.xml", text: xml.sheet1 }, { name: "xl/worksheets/sheet2.xml", text: xml.sheet2 }];
  return new Blob([zip(files)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
