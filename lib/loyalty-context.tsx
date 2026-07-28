"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getRewardById } from "./rewards-data";

export type Tier = "Bronze" | "Silver" | "Gold";

export type RedeemedReward = {
  id: string;
  rewardId: string;
  rewardName: string;
  points: number;
  date: string;
  status: "Redeemed" | "Expired" | "Pending";
};

export type PointsHistoryEntry = {
  id: string;
  date: string;
  orderNumber: string;
  pointsEarned: number;
  rewardRedeemed: string | null;
  runningTotal: number;
};

export type ActiveRewardQr = {
  rewardId: string;
  rewardName: string;
  points: number;
  generatedAt: number;
  expiresAt: number;
};

const STARTING_POINTS = 245;
const NEXT_REWARD_TARGET = 300;
const NEXT_REWARD_NAME = "Free Spanish Latte";

const seedPointsHistory: PointsHistoryEntry[] = [
  { id: "ph1", date: "July 18, 2026", orderNumber: "HOLA-104822", pointsEarned: 15, rewardRedeemed: null, runningTotal: 245 },
  { id: "ph2", date: "July 12, 2026", orderNumber: "HOLA-103390", pointsEarned: 20, rewardRedeemed: null, runningTotal: 230 },
  { id: "ph3", date: "July 5, 2026", orderNumber: "HOLA-101987", pointsEarned: 0, rewardRedeemed: "Free Americano", runningTotal: 210 },
  { id: "ph4", date: "June 28, 2026", orderNumber: "HOLA-099213", pointsEarned: 18, rewardRedeemed: null, runningTotal: 360 },
];

const seedRedeemedHistory: RedeemedReward[] = [
  { id: "rh1", rewardId: "free-americano", rewardName: "Free Americano", points: 150, date: "July 5, 2026", status: "Redeemed" },
  { id: "rh2", rewardId: "free-croissant", rewardName: "Free Croissant", points: 180, date: "June 14, 2026", status: "Redeemed" },
  { id: "rh3", rewardId: "hola-mug", rewardName: "HOLA Coffee Mug", points: 500, date: "May 2, 2026", status: "Expired" },
];

function getTier(points: number): Tier {
  if (points >= 1000) return "Gold";
  if (points >= 400) return "Silver";
  return "Bronze";
}

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

type LoyaltyContextValue = {
  points: number;
  tier: Tier;
  ordersCompleted: number;
  redeemedHistory: RedeemedReward[];
  pointsHistory: PointsHistoryEntry[];
  nextRewardTarget: number;
  nextRewardName: string;
  activeRewardQr: ActiveRewardQr | null;
  redeemReward: (rewardId: string) => boolean;
  clearActiveRewardQr: () => void;
};

const LoyaltyContext = createContext<LoyaltyContextValue | null>(null);

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(STARTING_POINTS);
  const [ordersCompleted] = useState(18);
  const [redeemedHistory, setRedeemedHistory] = useState<RedeemedReward[]>(seedRedeemedHistory);
  const [pointsHistory] = useState<PointsHistoryEntry[]>(seedPointsHistory);
  const [activeRewardQr, setActiveRewardQr] = useState<ActiveRewardQr | null>(null);

  const redeemReward = useCallback(
    (rewardId: string) => {
      const reward = getRewardById(rewardId);
      if (!reward || points < reward.points) return false;

      setPoints((p) => p - reward.points);
      const now = Date.now();
      setActiveRewardQr({
        rewardId: reward.id,
        rewardName: reward.name,
        points: reward.points,
        generatedAt: now,
        expiresAt: now + 30 * 60 * 1000,
      });
      setRedeemedHistory((prev) => [
        {
          id: makeId(),
          rewardId: reward.id,
          rewardName: reward.name,
          points: reward.points,
          date: new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" }),
          status: "Redeemed",
        },
        ...prev,
      ]);
      return true;
    },
    [points]
  );

  const clearActiveRewardQr = useCallback(() => setActiveRewardQr(null), []);

  const tier = useMemo(() => getTier(points), [points]);

  const value: LoyaltyContextValue = {
    points,
    tier,
    ordersCompleted,
    redeemedHistory,
    pointsHistory,
    nextRewardTarget: NEXT_REWARD_TARGET,
    nextRewardName: NEXT_REWARD_NAME,
    activeRewardQr,
    redeemReward,
    clearActiveRewardQr,
  };

  return <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>;
}

export function useLoyalty() {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) throw new Error("useLoyalty must be used within a LoyaltyProvider");
  return ctx;
}
