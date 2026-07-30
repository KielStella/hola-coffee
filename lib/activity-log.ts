import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

export async function logActivity({
  userId,
  action,
  entity,
  entityId,
  metadata,
}: {
  userId?: string | null;
  action: string;
  entity?: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        userId: userId ?? undefined,
        action,
        entity,
        entityId,
        metadata: metadata ?? undefined,
      },
    });
  } catch (error) {
    // Activity logging should never break the primary action.
    console.error("[activity-log] failed to record activity:", error);
  }
}
