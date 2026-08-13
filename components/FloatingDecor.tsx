"use client";

import { motion } from "framer-motion";

type Bean = { top: string; left: string; size: number; duration: number; delay: number; rotate: number };
type Bubble = { top: string; left: string; size: number; duration: number; delay: number };

const beans: Bean[] = [
  { top: "12%", left: "6%", size: 26, duration: 7, delay: 0, rotate: -20 },
  { top: "68%", left: "4%", size: 18, duration: 9, delay: 1.2, rotate: 15 },
  { top: "22%", left: "90%", size: 22, duration: 8, delay: 0.6, rotate: 30 },
  { top: "75%", left: "88%", size: 30, duration: 10, delay: 0.3, rotate: -10 },
  { top: "45%", left: "50%", size: 16, duration: 6, delay: 2, rotate: 5 },
];

const bubbles: Bubble[] = [
  { top: "80%", left: "12%", size: 40, duration: 8, delay: 0 },
  { top: "60%", left: "80%", size: 26, duration: 7, delay: 1 },
  { top: "30%", left: "20%", size: 18, duration: 6, delay: 0.5 },
  { top: "15%", left: "70%", size: 34, duration: 9, delay: 1.5 },
];

function CoffeeBean({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 26 34" fill="none" aria-hidden="true">
      <path
        d="M13 1C6 1 1 8 1 17s5 16 12 16 12-7 12-16S20 1 13 1Z"
        fill="var(--hola-brown)"
        opacity="0.18"
      />
      <path
        d="M13 3C10 10 10 24 13 31"
        stroke="var(--hola-brown)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}

export default function FloatingDecor({ variant = "both" }: { variant?: "beans" | "bubbles" | "both" }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {(variant === "beans" || variant === "both") &&
        beans.map((bean, i) => (
          <motion.div
            key={`bean-${i}`}
            className="absolute"
            style={{ top: bean.top, left: bean.left, rotate: bean.rotate }}
            animate={{ y: [0, -18, 0], rotate: [bean.rotate, bean.rotate + 12, bean.rotate] }}
            transition={{
              duration: bean.duration,
              delay: bean.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <CoffeeBean size={bean.size} />
          </motion.div>
        ))}
      {(variant === "bubbles" || variant === "both") &&
        bubbles.map((bubble, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full"
            style={{
              top: bubble.top,
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(90,169,230,0.15))",
              border: "1px solid rgba(90,169,230,0.25)",
            }}
            animate={{ y: [0, -26, 0], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
