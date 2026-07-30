"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { Gift, Info, ArrowLeft, Clock } from "lucide-react";
import { useLoyalty } from "@/lib/loyalty-context";

function formatCountdown(msRemaining: number) {
  const totalSeconds = Math.max(0, Math.floor(msRemaining / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function RewardQrPage() {
  const { activeRewardQr } = useLoyalty();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!activeRewardQr) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
        <Gift className="h-12 w-12 text-hola-brown-soft/40" />
        <h1 className="mt-5 text-2xl text-hola-brown">No active reward QR.</h1>
        <p className="mt-2 text-hola-brown-soft">Redeem a reward from the Rewards page to generate one.</p>
        <Link
          href="/rewards"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-hola-blue px-6 py-3 font-display text-white transition hover:bg-hola-blue-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Rewards
        </Link>
      </section>
    );
  }

  const msRemaining = activeRewardQr.expiresAt - now;
  const expired = msRemaining <= 0;
<<<<<<< HEAD
  const qrPayload = JSON.stringify({
    type: "reward",
    rewardId: activeRewardQr.rewardId,
    points: activeRewardQr.points,
    expiresAt: activeRewardQr.expiresAt,
  });
=======
  const qrPayload = activeRewardQr.qrToken;
>>>>>>> c71a751 (Initial commit)

  return (
    <section className="bg-hola-beige px-4 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hola-shadow mx-auto max-w-xl rounded-hola-lg bg-white p-6 sm:p-10"
      >
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-hola-yellow/30 px-4 py-1.5 text-sm font-semibold text-hola-brown">
            <Gift className="h-4 w-4" /> Reward QR
          </span>
          <h1 className="mt-4 text-3xl text-hola-brown">{activeRewardQr.rewardName}</h1>
          <p className="mt-1 text-hola-brown-soft">{activeRewardQr.points} points used</p>
        </div>

        <div
          className={`mx-auto mt-6 w-fit rounded-hola-md border-4 p-4 transition ${
            expired ? "border-gray-200 opacity-40 grayscale" : "border-hola-beige"
          }`}
        >
          <QRCode value={qrPayload} size={192} fgColor="#4A3325" bgColor="#FFFFFF" />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Clock className={`h-5 w-5 ${expired ? "text-gray-400" : "text-hola-blue-dark"}`} />
          <p className={`font-display text-lg ${expired ? "text-gray-400" : "text-hola-brown"}`}>
            {expired ? "This QR code has expired." : `${formatCountdown(msRemaining)} Remaining`}
          </p>
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-hola-sm bg-hola-yellow-soft/50 p-3 text-xs leading-relaxed text-hola-brown">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-hola-brown-soft" />
          <p>
            Present this QR Code to the cashier to claim your reward. This QR Code expires 30 minutes
            after redemption. This is a frontend-only preview — backend validation will be added in a
            future update.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/rewards"
            className="flex-1 rounded-full bg-hola-blue px-6 py-3 text-center font-display text-white transition hover:bg-hola-blue-dark"
          >
            Back to Rewards
          </Link>
          <Link
            href="/rewards/history"
            className="flex-1 rounded-full border-2 border-hola-brown/15 bg-white px-6 py-3 text-center font-display text-hola-brown transition hover:border-hola-yellow"
          >
            View Reward History
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
