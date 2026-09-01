type ZipEntry = { method: number; data: Uint8Array };

const decoder = new TextDecoder();
const xmlText = (value: string) => value.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
const columnIndex = (ref: string) => ref.replace(/\d/g, "").split("").reduce((total, char) => total * 26 + char.charCodeAt(0) - 64, 0) - 1;
const excelDate = (value: string) => /^\d+(?:\.\d+)?$/.test(value) ? new Date(Date.UTC(1899, 11, 30) + Number(value) * 86400000).toISOString().slice(0, 10) : value;

async function unzip(method: number, data: Uint8Array) {
  if (method === 0) return data;
  if (method !== 8 || typeof DecompressionStream === "undefined") throw new Error("Trình duyệt không thể đọc file Excel này. Hãy dùng Microsoft Edge hoặc Google Chrome mới nhất.");
  const copy = new Uint8Array(data.length); copy.set(data);
  const stream = new Blob([copy.buffer]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function entries(bytes: Uint8Array) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let end = -1;
  for (let index = Math.max(0, bytes.length - 22 - 0xffff); index <= bytes.length - 22; index++) if (view.getUint32(index, true) === 0x06054b50) end = index;
  if (end < 0) throw new Error("File Excel không hợp lệ.");
  const count = view.getUint16(end + 10, true), directory = view.getUint32(end + 16, true), result = new Map<string, ZipEntry>();
  let cursor = directory;
  for (let index = 0; index < count; index++) {
    if (view.getUint32(cursor, true) !== 0x02014b50) throw new Error("Không thể đọc file Excel.");
    const method = view.getUint16(cursor + 10, true), size = view.getUint32(cursor + 20, true), nameLength = view.getUint16(cursor + 28, true), extraLength = view.getUint16(cursor + 30, true), commentLength = view.getUint16(cursor + 32, true), localOffset = view.getUint32(cursor + 42, true);
    const name = decoder.decode(bytes.subarray(cursor + 46, cursor + 46 + nameLength));
    const localNameLength = view.getUint16(localOffset + 26, true), localExtraLength = view.getUint16(localOffset + 28, true), start = localOffset + 30 + localNameLength + localExtraLength;
    result.set(name, { method, data: await unzip(method, bytes.subarray(start, start + size)) });
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  return result;
}

export async function parseXlsxFile(file: File) {
  const archive = await entries(new Uint8Array(await file.arrayBuffer())), sharedXml = archive.get("xl/sharedStrings.xml") ? decoder.decode(archive.get("xl/sharedStrings.xml")!.data) : "";
  const shared = [...sharedXml.matchAll(/<si[^>]*>([\s\S]*?)<\/si>/g)].map(match => xmlText(match[1]));
  const sheet = archive.get("xl/worksheets/sheet1.xml");
  if (!sheet) throw new Error("Không tìm thấy sheet Import Template.");
  const matrix: string[][] = [];
  for (const rowMatch of decoder.decode(sheet.data).matchAll(/<(?:\w+:)?row[^>]*>([\s\S]*?)<\/(?:\w+:)?row>/g)) {
    const row: string[] = [];
    for (const cellMatch of rowMatch[1].matchAll(/<(?:\w+:)?c\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?c>/g)) {
      const attrs = cellMatch[1], body = cellMatch[2], ref = attrs.match(/\br="([^"]+)"/)?.[1] || "A1", kind = attrs.match(/\bt="([^"]+)"/)?.[1] || "";
      const value = body.match(/<(?:\w+:)?v[^>]*>([\s\S]*?)<\/(?:\w+:)?v>/)?.[1] || body.match(/<(?:\w+:)?t[^>]*>([\s\S]*?)<\/(?:\w+:)?t>/)?.[1] || "";
      row[columnIndex(ref)] = kind === "s" ? shared[Number(value)] || "" : xmlText(value);
    }
    matrix.push(row);
  }
  const headers = (matrix[0] || []).map(value => (value || "").trim());
  return { headers, rows: matrix.slice(1).filter(row => row.some(value => String(value || "").trim())).map(row => Object.fromEntries(headers.map((header, index) => [header, header === "purchaseDate" || header === "warrantyExpiry" ? excelDate(row[index] || "") : row[index] || ""]))) };
}
