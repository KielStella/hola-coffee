"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";
import { checkRateLimit } from "@/lib/rate-limit";

const rewardSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  points: z.number().int().positive(),
  category: z.enum(["COFFEE", "NON_COFFEE", "PASTRIES", "DESSERTS", "MERCHANDISE", "LIMITED_EDITION"]),
  image: z.string().optional(),
  isAvailable: z.boolean().default(true),
});

export type RewardInput = z.infer<typeof rewardSchema>;

export async function createReward(input: RewardInput) {
  const session = await requireRole("ADMIN");
  const parsed = rewardSchema.parse(input);
  const reward = await prisma.reward.create({ data: parsed });

  await logActivity({
    userId: session.user.id,
    action: `Admin created reward "${reward.name}"`,
    entity: "Reward",
    entityId: reward.id,
  });

  revalidatePath("/admin/rewards");
  revalidatePath("/rewards");
  return reward;
}

export async function updateReward(id: string, input: Partial<RewardInput>) {
  const session = await requireRole("ADMIN");
  const parsed = rewardSchema.partial().parse(input);
  const reward = await prisma.reward.update({ where: { id }, data: parsed });

  await logActivity({
    userId: session.user.id,
    action: `Admin updated reward "${reward.name}"`,
    entity: "Reward",
    entityId: id,
  });

  revalidatePath("/admin/rewards");
  revalidatePath("/rewards");
  return reward;
}

export async function deleteReward(id: string) {
  const session = await requireRole("ADMIN");
  await prisma.reward.delete({ where: { id } });

  await logActivity({ userId: session.user.id, action: "Admin deleted a reward", entity: "Reward", entityId: id });

  revalidatePath("/admin/rewards");
  revalidatePath("/rewards");
  return { success: true };
}

/** Customer requests a redemption. Points are reserved but NOT deducted until staff approves. */
export async function redeemReward(rewardId: string) {
  const session = await requireAuth();
  await checkRateLimit(`redeem:${session.user.id}`, 10, 10 * 60_000);

  const reward = await prisma.reward.findUnique({ where: { id: rewardId } });
  if (!reward || !reward.isAvailable) throw new Error("This reward is not available.");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.points < reward.points) {
    throw new Error("You don't have enough points for this reward.");
  }

  const redemption = await prisma.rewardRedemption.create({
    data: {
      userId: session.user.id,
      rewardId,
      points: reward.points,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: `Redeemed reward "${reward.name}"`,
    entity: "RewardRedemption",
    entityId: redemption.id,
  });

  return redemption;
}

export async function getRedemptionByQrToken(qrToken: string) {
  await requireRole("ADMIN", "STAFF");
  return prisma.rewardRedemption.findUnique({
    where: { qrToken },
    include: { reward: true, user: true },
  });
}

/** Staff approves a scanned Reward QR — this is the only point where points are actually deducted. */
export async function approveRewardRedemption(redemptionId: string) {
  const session = await requireRole("ADMIN", "STAFF");

  const redemption = await prisma.rewardRedemption.findUnique({
    where: { id: redemptionId },
    include: { reward: true },
  });
  if (!redemption) throw new Error("Redemption not found.");
  if (redemption.status !== "PENDING") throw new Error(`This redemption is already ${redemption.status.toLowerCase()}.`);
  if (redemption.expiresAt < new Date()) {
    await prisma.rewardRedemption.update({ where: { id: redemptionId }, data: { status: "EXPIRED" } });
    throw new Error("This Reward QR has expired.");
  }

  const user = await prisma.user.findUnique({ where: { id: redemption.userId } });
  if (!user || user.points < redemption.points) {
    throw new Error("Customer no longer has enough points for this reward.");
  }

  await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: redemption.userId },
      data: { points: { decrement: redemption.points } },
    });

    await tx.rewardRedemption.update({
      where: { id: redemptionId },
      data: { status: "REDEEMED", approvedAt: new Date() },
    });

    await tx.pointsHistory.create({
      data: {
        userId: redemption.userId,
        pointsEarned: 0,
        rewardRedeemed: redemption.reward.name,
        runningTotal: updatedUser.points,
      },
    });
  });

  await logActivity({
    userId: session.user.id,
    action: `Staff approved redemption of "${redemption.reward.name}"`,
    entity: "RewardRedemption",
    entityId: redemptionId,
  });

  revalidatePath("/staff-portal/orders");
  return { success: true };
}

export async function cancelRewardRedemption(redemptionId: string) {
  const session = await requireRole("ADMIN", "STAFF");
  await prisma.rewardRedemption.update({
    where: { id: redemptionId },
    data: { status: "CANCELLED" },
  });

  await logActivity({
    userId: session.user.id,
    action: "Staff cancelled a reward redemption",
    entity: "RewardRedemption",
    entityId: redemptionId,
  });

  return { success: true };
}
