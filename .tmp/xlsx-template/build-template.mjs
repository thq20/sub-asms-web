import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "D:/Sub ASMS/sub-asms/public/templates";
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Import Template");
const lists = workbook.worksheets.add("Lists");
sheet.showGridLines = false;
lists.showGridLines = false;

const headers = ["prefix", "assetType", "serialNumber", "asmsBarcode", "invoiceId", "description", "originalCost", "location", "floor", "owner", "purchasingUnit", "seatCode", "ticketId", "status", "purchaseDate", "warrantyExpiry", "note"];
sheet.getRange("A1:Q1").values = [headers];
// All fields are optional. Leave any field blank when it does not apply; blank values are sent as NULL.
sheet.getRange("A2:Q2").values = [["", "", "", "", "", "", null, "", "", "", "", "", "", "", null, null, ""]];
sheet.getRange("A1:Q1").format = { fill: "#10243D", font: { bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", wrapText: true };
sheet.getRange("A2:Q2").format = { fill: "#F6FAFD", borders: { preset: "inside", style: "thin", color: "#D9E3EC" } };
sheet.getRange("G2:G200").format.numberFormat = "#,##0";
sheet.getRange("O2:P200").format.numberFormat = "yyyy-mm-dd";
sheet.getRange("A1:Q200").format.borders = { preset: "outside", style: "thin", color: "#D9E3EC" };
sheet.getRange("A:Q").format.autofitColumns();
for (const col of ["F", "Q"]) sheet.getRange(col + ":" + col).format.columnWidth = 30;
sheet.getRange("A:A").format.columnWidth = 16;
sheet.getRange("C:C").format.columnWidth = 18;
sheet.getRange("G:G").format.columnWidth = 16;
sheet.freezePanes.freezeRows(1);

const listValues = {
  assetType: ["Laptop", "Desktop", "Monitor", "SSD", "RAM"],
  location: ["Kho IT", "Tòa A", "Tòa B"],
  floor: ["Tầng 1", "Tầng 3", "Tầng 5"],
  owner: ["Nguyễn Văn An", "Store", "NguyenVanA"],
  purchasingUnit: ["IT Operations", "Store"],
  status: ["UN_USED", "IN_USED", "MAINTENANCE", "BROKEN"],
};
const ranges = {};
let col = 0;
for (const [name, values] of Object.entries(listValues)) {
  const column = String.fromCharCode(65 + col);
  lists.getRange(column + "1").values = [[name]];
  lists.getRange(column + "2:" + column + (values.length + 1)).values = values.map(value => [value]);
  lists.getRange(column + "1:" + column + (values.length + 1)).format = { borders: { preset: "outside", style: "thin", color: "#D9E3EC" } };
  lists.getRange(column + "1").format = { fill: "#DFF4EE", font: { bold: true, color: "#145B4E" } };
  lists.getRange(column + ":" + column).format.columnWidth = 20;
  ranges[name] = "'Lists'!$" + column + "$2:$" + column + "$" + (values.length + 1);
  col++;
}
const validations = { B: ranges.assetType, H: ranges.location, I: ranges.floor, J: ranges.owner, K: ranges.purchasingUnit, N: ranges.status };
for (const [column, formula1] of Object.entries(validations)) {
  sheet.getRange(column + "2:" + column + "200").dataValidation = { rule: { type: "list", formula1 } };
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputDir + "/sub-asms-import-template.xlsx");
const preview = await workbook.render({ sheetName: "Import Template", range: "A1:Q8", scale: 1.25, format: "png" });
await fs.writeFile("D:/Sub ASMS/sub-asms/.tmp/xlsx-template/preview.png", new Uint8Array(await preview.arrayBuffer()));
