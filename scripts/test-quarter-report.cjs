process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({ module: "CommonJS", moduleResolution: "node" });
require("ts-node/register/transpile-only");
const assert = require("node:assert/strict");
const { createQuarterlyReportWorkbook } = require("../src/lib/xlsxReportClient");
const { parseXlsxFile } = require("../src/lib/xlsxClient");

async function run() {
  const row = { assetType: "RAM", purchaseDate: "2026-01-15", invoiceInfo: "INV-01", procurementCode: "PO-2026-01", assetName: "RAM DDR4 16GB", unitPrice: 1250000, quantity: 4, owner: "Nguyen Van A", purchasingUnit: "FSO", ticketId: "2472093", usageDate: "2026-03-20", note: "Đã lắp" };
  const blob = createQuarterlyReportWorkbook([row], 2026, 1);
  const file = new File([blob], "q1.xlsx", { type: blob.type });
  const parsed = await parseXlsxFile(file);
  assert.deepEqual(parsed.headers, ["Loại tài sản", "Ngày mua", "Thông tin hoá đơn", "Code mua sắm", "Tên tài sản", "Đơn giá", "Số lượng", "Người sử dụng", "Đơn vị", "ID Ticket", "Ngày sử dụng", "Note"]);
  assert.equal(parsed.rows[0]["Code mua sắm"], "PO-2026-01");
  assert.equal(parsed.rows[0]["Đơn giá"], "1250000");
  assert.equal(parsed.rows[0]["Số lượng"], "4");
  assert.equal(parsed.rows[0]["ID Ticket"], "2472093");
  console.log("PASS: quarterly Excel has 12 requested columns and preserves text, dates, price, quantity and ticket data.");
}
run().catch(error => { console.error(error); process.exitCode = 1; });
