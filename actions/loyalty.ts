"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export type LoyaltySummary = {
  points: number;
  tier: string;
  ordersCompleted: number;
  redeemedHistory: {
    id: string;
    rewardId: string;
    rewardName: string;
    points: number;
    date: string;
    status: "Redeemed" | "Expired" | "Pending" | "Cancelled";
  }[];
  pointsHistory: {
    id: string;
    date: string;
    orderNumber: string;
    pointsEarned: number;
    rewardRedeemed: string | null;
    runningTotal: number;
  }[];
};

const STATUS_LABELS = {
  REDEEMED: "Redeemed",
  EXPIRED: "Expired",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
} as const;

/**
 * Returns the signed-in user's real points/tier/history from the database.
 * A brand-new sign up correctly starts at 0 points (the `User.points`
 * column defaults to 0) rather than the frontend's guest-demo placeholder.
 * Returns null when there's no session (guest browsing keeps the demo data).
 */
export async function getMyLoyaltySummary(): Promise<LoyaltySummary | null> {
  const session = await auth();
  if (!session?.user) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      rewardRedemptions: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { reward: true },
      },
      pointsHistory: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { order: { select: { orderNumber: true } } },
      },
    },
  });

  if (!user) return null;

  return {
    points: user.points,
    tier: user.tier,
    ordersCompleted: user.ordersCompleted,
    redeemedHistory: user.rewardRedemptions.map((r) => ({
      id: r.id,
      rewardId: r.rewardId,
      rewardName: r.reward.name,
      points: r.points,
      date: r.createdAt.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" }),
      status: STATUS_LABELS[r.status],
    })),
    pointsHistory: user.pointsHistory.map((p) => ({
      id: p.id,
      date: p.createdAt.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" }),
      orderNumber: p.order?.orderNumber ?? "—",
      pointsEarned: p.pointsEarned,
      rewardRedeemed: p.rewardRedeemed,
      runningTotal: p.runningTotal,
    })),
  };
}
