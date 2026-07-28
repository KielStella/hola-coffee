"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Gift, Award, Repeat, ShoppingBag, History } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingDecor from "@/components/FloatingDecor";
import CircularProgress from "@/components/rewards/CircularProgress";
import RewardFilterTabs from "@/components/rewards/RewardFilterTabs";
import RewardCard from "@/components/rewards/RewardCard";
import RedeemModal from "@/components/rewards/RedeemModal";
import { useLoyalty } from "@/lib/loyalty-context";
import { getRewardsByCategory, type Reward, type RewardCategory } from "@/lib/rewards-data";

export default function RewardsPage() {
  const { points, tier, ordersCompleted, redeemedHistory, nextRewardTarget, nextRewardName } =
    useLoyalty();
  const [activeCategory, setActiveCategory] = useState<RewardCategory>("Coffee");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const rewardsInCategory = useMemo(() => getRewardsByCategory(activeCategory), [activeCategory]);
  const pointsToNext = Math.max(0, nextRewardTarget - points);
  const nextRewardProgress = Math.min(100, (points / nextRewardTarget) * 100);

  const stats = [
    { label: "Current Tier", value: tier, icon: Award },
    { label: "Points", value: `${points}`, icon: Gift },
    { label: "Rewards Redeemed", value: `${redeemedHistory.length}`, icon: Repeat },
    { label: "Orders Completed", value: `${ordersCompleted}`, icon: ShoppingBag },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-hola-blue-dark to-hola-blue px-4 py-16 text-center text-white sm:py-24">
        <FloatingDecor variant="bubbles" />
        <div className="relative mx-auto max-w-2xl">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              <Gift className="h-4 w-4" /> HOLA Rewards
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl">HOLA Rewards</h1>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Every completed purchase earns points. Collect points and redeem exclusive drinks,
              desserts, and merchandise.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection className="relative mx-auto mt-12 flex justify-center" delay={0.15}>
          <CircularProgress value={points} max={nextRewardTarget} label={`${points}`} sublabel="Points" />
        </AnimatedSection>

        <AnimatedSection
          className="relative mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
          delay={0.25}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-hola-md bg-white/10 p-4 text-center backdrop-blur-sm"
            >
              <stat.icon className="mx-auto h-5 w-5 text-hola-yellow" />
              <p className="mt-2 font-display text-lg">{stat.value}</p>
              <p className="text-xs uppercase tracking-wide text-white/70">{stat.label}</p>
            </div>
          ))}
        </AnimatedSection>
      </section>

      <section className="bg-hola-beige px-4 py-12 sm:py-16">
        <AnimatedSection className="mx-auto max-w-2xl rounded-hola-lg bg-white p-6 shadow-md sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-hola-brown-soft">
                Next Reward
              </p>
              <p className="mt-1 font-display text-xl text-hola-brown">{nextRewardName}</p>
            </div>
            <p className="font-display text-hola-blue-dark">
              {pointsToNext > 0 ? `Need ${pointsToNext} More Points` : "Unlocked!"}
            </p>
          </div>
          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-hola-beige">
            <div
              className="h-full rounded-full bg-gradient-to-r from-hola-blue to-hola-yellow transition-all duration-700"
              style={{ width: `${nextRewardProgress}%` }}
            />
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px]">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-hola-brown sm:text-4xl">Redeem a Reward</h2>
            <p className="mt-3 text-hola-brown-soft">Browse by category and redeem when you&apos;re ready.</p>
          </AnimatedSection>

          <AnimatedSection className="mt-10" delay={0.1}>
            <RewardFilterTabs active={activeCategory} onChange={setActiveCategory} />
          </AnimatedSection>

          <div className="mt-10">
            {rewardsInCategory.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <Gift className="h-12 w-12 text-hola-brown-soft/40" />
                <p className="mt-4 font-display text-xl text-hola-brown">No rewards available.</p>
              </div>
            ) : (
              <div
                key={activeCategory}
                className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
              >
                {rewardsInCategory.map((reward, i) => (
                  <AnimatedSection key={reward.id} delay={(i % 3) * 0.08}>
                    <RewardCard reward={reward} currentPoints={points} onRedeem={setSelectedReward} />
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>

          <AnimatedSection className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/rewards/history"
              className="inline-flex items-center gap-2 rounded-full border-2 border-hola-brown/15 bg-white px-6 py-3 font-display text-hola-brown transition hover:border-hola-yellow"
            >
              <History className="h-4 w-4" /> Reward History
            </Link>
            <Link
              href="/rewards/points"
              className="inline-flex items-center gap-2 rounded-full border-2 border-hola-brown/15 bg-white px-6 py-3 font-display text-hola-brown transition hover:border-hola-yellow"
            >
              <Gift className="h-4 w-4" /> Points History
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <RedeemModal reward={selectedReward} onClose={() => setSelectedReward(null)} />
    </>
  );
}
