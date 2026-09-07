export function warrantyDate(purchaseDate: string, months: unknown) {
  const count = Number(months);
  if (!purchaseDate || !Number.isInteger(count) || count < 0) return null;
  const date = new Date(purchaseDate.slice(0, 10) + 'T00:00:00Z');
  if (!Number.isFinite(date.getTime())) return null;
  const day = date.getUTCDate();
  date.setUTCDate(1); date.setUTCMonth(date.getUTCMonth() + count);
  const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, last));
  return date.toISOString().slice(0, 10);
}

export function editPayload(form: Record<string, any>) {
  const text = (value: any) => String(value ?? '').trim() || null;
  return {
    status: form.status, locationId: text(form.locationId), floorId: text(form.floorId),
    ownerId: text(form.ownerId), purchasingUnitId: text(form.purchasingUnitId),
    seatCode: text(form.seatCode), description: text(form.description), procurementCode: text(form.procurementCode),
    originalCost: form.originalCost == null || form.originalCost === '' ? null : Number(form.originalCost),
    assetTypeId: text(form.assetTypeId), purchaseDate: text(form.purchaseDate)?.slice(0, 10) || null,
    warrantyExpiry: form.warrantyMonths !== '' && form.warrantyMonths != null ? warrantyDate(form.purchaseDate, form.warrantyMonths) : text(form.warrantyExpiry)?.slice(0, 10) || null,
    invoiceId: text(form.invoiceId), serialNumber: text(form.serialNumber), asmsBarcode: text(form.asmsBarcode)?.toUpperCase() || null,
    ticketId: text(form.ticketId), note: text(form.note),
  };
}

export function assetChanged(form: Record<string, any>, original: Record<string, any>) {
  return JSON.stringify(editPayload(form)) !== JSON.stringify(editPayload(original));
}
