"use client";

import Link from "next/link";
import { Gift, ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import RewardArt from "@/components/rewards/RewardArt";
import { useLoyalty } from "@/lib/loyalty-context";
import { getRewardById, rewards as fallbackRewards } from "@/lib/rewards-data";

const statusStyles: Record<string, string> = {
  Redeemed: "bg-emerald-100 text-emerald-700",
  Expired: "bg-gray-200 text-gray-600",
  Pending: "bg-hola-yellow/40 text-hola-brown",
  Cancelled: "bg-red-100 text-red-600",
};

export default function RewardHistoryPage() {
  const { redeemedHistory } = useLoyalty();

  return (
    <section className="bg-hola-beige px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-hola-blue-dark shadow-sm">
            <Gift className="h-4 w-4" /> Reward History
          </span>
          <h1 className="mt-4 text-3xl text-hola-brown sm:text-4xl">Your Redeemed Rewards</h1>
        </AnimatedSection>

        <div className="mt-10 space-y-4">
          {redeemedHistory.length === 0 ? (
            <div className="flex flex-col items-center rounded-hola-lg bg-white py-16 text-center shadow-md">
              <Gift className="h-12 w-12 text-hola-brown-soft/40" />
              <p className="mt-4 font-display text-lg text-hola-brown">No rewards available.</p>
              <p className="mt-1 text-sm text-hola-brown-soft">
                Redeem a reward from the Rewards page to see it here.
              </p>
            </div>
          ) : (
            redeemedHistory.map((entry, i) => {
              const reward = getRewardById(fallbackRewards, entry.rewardId);
              return (
                <AnimatedSection key={entry.id} delay={i * 0.05}>
                  <div className="flex items-center gap-4 rounded-hola-lg bg-white p-4 shadow-md sm:p-5">
                    {reward && (
                      <RewardArt
                        category={reward.category}
                        name={reward.name}
                        className="h-16 w-16 shrink-0 rounded-hola-sm"
                        iconClassName="h-8 w-8"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-display text-hola-brown">{entry.rewardName}</p>
                      <p className="text-sm text-hola-brown-soft">
                        {entry.points} points • {entry.date}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[entry.status]}`}
                    >
                      {entry.status}
                    </span>
                  </div>
                </AnimatedSection>
              );
            })
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/rewards"
            className="inline-flex items-center gap-2 rounded-full bg-hola-blue px-6 py-3 font-display text-white transition hover:bg-hola-blue-dark"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Rewards
          </Link>
        </div>
      </div>
    </section>
  );
}
