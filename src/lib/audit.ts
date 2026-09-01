import { AuditAction, Prisma } from "../generated/prisma";
import { prisma } from "./prisma";

export async function audit(entityId: string, actionType: AuditAction, oldValues: unknown, newValues: unknown, changedBy = "Admin") {
  return prisma.auditLog.create({ data: { entityName: "Asset", entityId, actionType, oldValues: oldValues as Prisma.InputJsonValue, newValues: newValues as Prisma.InputJsonValue, changedBy } });
}
