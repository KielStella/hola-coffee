import Link from "next/link";
import { Coffee, Croissant, CakeSlice, Gift, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { rewardsPreview } from "@/lib/data";

const iconMap = { Coffee, Pastries: Croissant, Desserts: CakeSlice, "Gift Items": Gift };

export default function RewardsPreview() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-hola-blue-dark to-hola-blue px-4 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Earn Rewards Every Visit</h2>
          <p className="mt-3 text-white/85">
            Every completed purchase earns loyalty points. Save your points and redeem exciting rewards.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {rewardsPreview.map((reward, i) => {
            const Icon = iconMap[reward.category as keyof typeof iconMap] ?? Coffee;
            return (
              <AnimatedSection key={reward.id} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-hola-lg bg-white/10 p-6 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                    <Icon className="h-7 w-7 text-hola-yellow" strokeWidth={1.75} />
                  </div>
                  <p className="mt-4 font-display text-sm sm:text-base">{reward.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-white/70">{reward.category}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <Link
            href="/rewards"
            className="inline-flex items-center gap-2 rounded-full bg-hola-yellow px-8 py-3.5 font-display text-hola-brown shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Explore Rewards
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
