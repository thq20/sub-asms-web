export type QuarterReportRow = {
  assetType: string;
  purchaseDate: string;
  invoiceInfo: string;
  procurementCode: string;
  assetName: string;
  unitPrice: number | null;
  quantity: number;
  owner: string;
  purchasingUnit: string;
  ticketId: string;
  usageDate: string;
  note: string;
};

const encoder = new TextEncoder();
const escapeXml = (value: unknown) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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

const headers = ["Loại tài sản", "Ngày mua", "Thông tin hoá đơn", "Code mua sắm", "Tên tài sản", "Đơn giá", "Số lượng", "Người sử dụng", "Đơn vị", "ID Ticket", "Ngày sử dụng", "Note"];
const dateCell = (value: string, ref: string) => value ? `<c r="${ref}" t="d" s="2"><v>${escapeXml(value.slice(0, 10))}</v></c>` : `<c r="${ref}" s="2"/>`;
const textCell = (value: unknown, ref: string, style = 0) => `<c r="${ref}" t="inlineStr"${style ? ` s="${style}"` : ""}><is><t>${escapeXml(value)}</t></is></c>`;
const numberCell = (value: number | null, ref: string, style = 0) => value == null || !Number.isFinite(Number(value)) ? `<c r="${ref}"${style ? ` s="${style}"` : ""}/>` : `<c r="${ref}"${style ? ` s="${style}"` : ""}><v>${Number(value)}</v></c>`;

export function createQuarterlyReportWorkbook(rows: QuarterReportRow[], year: number, quarter: number) {
  const header = headers.map((value, index) => textCell(value, `${column(index)}1`, 1)).join("");
  const body = rows.map((row, rowIndex) => {
    const values = [row.assetType, row.purchaseDate, row.invoiceInfo, row.procurementCode, row.assetName, row.unitPrice, row.quantity, row.owner, row.purchasingUnit, row.ticketId, row.usageDate, row.note];
    const cells = values.map((value, index) => {
      const ref = `${column(index)}${rowIndex + 2}`;
      if (index === 1 || index === 10) return dateCell(String(value || ""), ref);
      if (index === 5) return numberCell(value as number | null, ref, 3);
      if (index === 6) return numberCell(Number(value), ref, 4);
      return textCell(value, ref);
    }).join("");
    return `<row r="${rowIndex + 2}">${cells}</row>`;
  }).join("");
  const endRow = Math.max(1, rows.length + 1);
  const widths = [18, 13, 20, 18, 32, 14, 11, 21, 18, 18, 15, 34].map((width, index) => `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`).join("");
  const contentTypes = `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;
  const workbook = `<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Q${quarter} ${year}" sheetId="1" r:id="rId1"/></sheets></workbook>`;
  const workbookRels = `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
  const styles = `<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Be Vietnam Pro"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Be Vietnam Pro"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF123B5D"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border/><border><left style="thin"><color rgb="FFD9E3EC"/></left><right style="thin"><color rgb="FFD9E3EC"/></right><top style="thin"><color rgb="FFD9E3EC"/></top><bottom style="thin"><color rgb="FFD9E3EC"/></bottom></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="14" fontId="0" fillId="0" borderId="1" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="1" applyNumberFormat="1"/><xf numFmtId="1" fontId="0" fillId="0" borderId="1" applyNumberFormat="1"/></cellXfs></styleSheet>`;
  const sheet = `<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView showGridLines="0" workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${widths}</cols><sheetData><row r="1" ht="32" customHeight="1">${header}</row>${body}</sheetData><autoFilter ref="A1:L${endRow}"/></worksheet>`;
  const files = [{ name: "[Content_Types].xml", text: contentTypes }, { name: "_rels/.rels", text: rels }, { name: "xl/workbook.xml", text: workbook }, { name: "xl/_rels/workbook.xml.rels", text: workbookRels }, { name: "xl/styles.xml", text: styles }, { name: "xl/worksheets/sheet1.xml", text: sheet }];
  return new Blob([zip(files)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
