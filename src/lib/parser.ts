const rules: Record<string, RegExp> = {
  ticketCode: /(?:ticket|mã\s*ticket)\s*[:#-]?\s*([A-Z0-9-]+)/i,
  barcode: /(?:barcode|mã\s*tài\s*sản)\s*[:#-]?\s*([A-Z]{2,12}-\d{1,})/i,
  owner: /(?:owner|người\s*(?:sở\s*hữu|dùng))\s*[:#-]?\s*([^,;\n]+)/i,
  location: /(?:location|vị\s*trí)\s*[:#-]?\s*([^,;\n]+)/i,
  floor: /(?:floor|tầng)\s*[:#-]?\s*([^,;\n]+)/i,
  seatCode: /(?:seat\s*code|seatcode|chỗ\s*ngồi)\s*[:#-]?\s*([^,;\n]+)/i,
  serialNumber: /(?:serial(?:\s*number)?|s\/n|sn)\s*[:#-]?\s*([^,;\n]+)/i,
};
export function parseTicket(sourceText: string) {
  return Object.fromEntries(Object.entries(rules).map(([key, regex]) => [key, sourceText.match(regex)?.[1]?.trim() || null]));
}
