import { prisma } from "@/lib/prisma";
import RewardManager from "@/components/dashboard/RewardManager";

export const dynamic = "force-dynamic";

export default async function AdminRewardsPage() {
  const rewards = await prisma.reward.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Rewards Management</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Create and manage the HOLA Rewards catalog.</p>
      <div className="mt-6">
        <RewardManager rewards={rewards} />
      </div>
    </div>
  );
}
