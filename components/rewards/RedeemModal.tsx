"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gem } from "lucide-react";
import confetti from "canvas-confetti";
import RewardArt from "./RewardArt";
import { useLoyalty } from "@/lib/loyalty-context";
import type { Reward } from "@/lib/rewards-data";

export default function RedeemModal({
  reward,
  onClose,
}: {
  reward: Reward | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const { points, redeemReward } = useLoyalty();

  if (!reward) return null;

  const remaining = points - reward.points;

  async function handleConfirmRedeem() {
    if (!reward) return;
    const success = await redeemReward(reward.id);
    if (success) {
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#5AA9E6", "#F8DC6B", "#4A3325", "#FFFFFF"],
      });
      onClose();
      router.push("/rewards/qr");
    }
  }

  return (
    <AnimatePresence>
      {reward && (
        <motion.div
          className="fixed inset-0 z-110 flex items-center justify-center bg-hola-brown/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Redeem ${reward.name}`}
        >
          <motion.div
            className="hola-shadow w-full max-w-md overflow-hidden rounded-hola-lg bg-white"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-40">
              <RewardArt category={reward.category} name={reward.name} className="h-full w-full" iconClassName="h-16 w-16" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-hola-brown shadow transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl text-hola-brown">{reward.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-hola-brown-soft">{reward.description}</p>

              <div className="mt-5 space-y-2 rounded-hola-sm bg-hola-beige p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-hola-brown-soft">Points Required</span>
                  <span className="font-display text-hola-brown">{reward.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-hola-brown-soft">Current Points</span>
                  <span className="font-display text-hola-brown">{points}</span>
                </div>
                <div className="flex justify-between border-t border-white pt-2">
                  <span className="text-hola-brown-soft">Remaining After Redeem</span>
                  <span className="font-display text-hola-blue-dark">{remaining}</span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2 text-sm text-hola-brown">
                <Gem className="mt-0.5 h-4 w-4 shrink-0 text-hola-blue-dark" />
                <p>Are you sure you want to redeem this reward?</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleConfirmRedeem}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-hola-blue px-6 py-3 font-display text-white shadow-lg shadow-hola-blue/30 transition hover:-translate-y-0.5 hover:bg-hola-blue-dark hover:shadow-xl"
                >
                  Redeem Reward
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full border-2 border-hola-brown/15 bg-white px-6 py-3 font-display text-hola-brown transition hover:border-hola-yellow"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
