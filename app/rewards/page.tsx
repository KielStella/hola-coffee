import { prisma } from "@/lib/prisma";
import RewardsBrowser from "@/components/rewards/RewardsBrowser";
import { rewards as fallbackRewards, formatRewardCategory, type Reward } from "@/lib/rewards-data";

export const dynamic = "force-dynamic";

async function getRewards(): Promise<Reward[]> {
  try {
    const rewards = await prisma.reward.findMany({
      where: { isAvailable: true },
      orderBy: { sortOrder: "asc" },
    });

    if (rewards.length === 0) return fallbackRewards;

    return rewards.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      points: r.points,
      category: formatRewardCategory(r.category),
      image: r.image,
    }));
  } catch (error) {
    console.error("[rewards] failed to load rewards from database, using fallback:", error);
    return fallbackRewards;
  }
}

export default async function RewardsPage() {
  const rewards = await getRewards();
  return <RewardsBrowser rewards={rewards} />;
}
