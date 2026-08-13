import { prisma } from "./prisma";

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
  metadata?: Record<string, unknown>;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        userId: userId ?? undefined,
        action,
        entity,
        entityId,
        metadata: metadata as any,
      },
    });
  } catch (error) {
    // Activity logging should never break the primary action.
    console.error("[activity-log] failed to record activity:", error);
  }
}
