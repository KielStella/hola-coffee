"use client";

import Link from "next/link";
import { History, ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLoyalty } from "@/lib/loyalty-context";

export default function PointsHistoryPage() {
  const { pointsHistory } = useLoyalty();

  return (
    <section className="bg-hola-beige px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-hola-blue-dark shadow-sm">
            <History className="h-4 w-4" /> Points History
          </span>
          <h1 className="mt-4 text-3xl text-hola-brown sm:text-4xl">Your Points Ledger</h1>
        </AnimatedSection>

        {pointsHistory.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-hola-lg bg-white py-16 text-center shadow-md">
            <History className="h-12 w-12 text-hola-brown-soft/40" />
            <p className="mt-4 font-display text-lg text-hola-brown">No point history yet.</p>
          </div>
        ) : (
          <div className="mt-10 overflow-hidden rounded-hola-lg bg-white shadow-md">
            <div className="hidden grid-cols-5 gap-4 bg-hola-brown px-6 py-3 text-xs font-semibold uppercase tracking-wide text-hola-beige sm:grid">
              <span>Date</span>
              <span>Order Number</span>
              <span>Points Earned</span>
              <span>Reward Redeemed</span>
              <span className="text-right">Running Total</span>
            </div>
            <ul>
              {pointsHistory.map((entry, i) => (
                <AnimatedSection
                  key={entry.id}
                  delay={i * 0.05}
                  as="li"
                  className="grid grid-cols-2 gap-2 border-b border-hola-beige px-6 py-4 text-sm last:border-none sm:grid-cols-5 sm:gap-4"
                >
                  <span className="text-hola-brown-soft sm:text-hola-brown">{entry.date}</span>
                  <span className="text-hola-brown-soft">{entry.orderNumber}</span>
                  <span className={entry.pointsEarned > 0 ? "font-semibold text-emerald-600" : "text-hola-brown-soft"}>
                    {entry.pointsEarned > 0 ? `+${entry.pointsEarned}` : "—"}
                  </span>
                  <span className="text-hola-brown-soft">{entry.rewardRedeemed ?? "—"}</span>
                  <span className="font-display text-hola-brown sm:text-right">{entry.runningTotal} pts</span>
                </AnimatedSection>
              ))}
            </ul>
          </div>
        )}

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
