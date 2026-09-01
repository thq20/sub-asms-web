import { prisma } from "./prisma";

export async function allocateBarcodes(prefix: string, amount: number) {
  const cleanPrefix = prefix.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
  if (!cleanPrefix || amount < 1 || amount > 500) throw new Error("Loại linh kiện hoặc số lượng không hợp lệ.");
  const start = await prisma.$transaction(async (tx) => {
    const current = await tx.barcodeSequence.upsert({ where: { prefix: cleanPrefix }, create: { prefix: cleanPrefix, lastValue: amount }, update: { lastValue: { increment: amount } } });
    return current.lastValue - amount + 1;
  }, { isolationLevel: "Serializable" });
  return Array.from({ length: amount }, (_, i) => `${cleanPrefix}-${String(start + i).padStart(5, "0")}`);
}
