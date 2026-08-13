"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import type { Reward } from "./rewards-data";

export type Tier = "Bronze" | "Silver" | "Gold";

export type RedeemedReward = {
  id: string;
  rewardId: string;
  rewardName: string;
  points: number;
  date: string;
  status: "Redeemed" | "Expired" | "Pending" | "Cancelled";
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
  qrToken: string;
};

/** Demo data shown to signed-out visitors browsing the Rewards page. */
const DEMO_STARTING_POINTS = 245;
const DEMO_ORDERS_COMPLETED = 18;
const NEXT_REWARD_TARGET = 300;
const NEXT_REWARD_NAME = "Free Spanish Latte";

const demoPointsHistory: PointsHistoryEntry[] = [
  { id: "ph1", date: "July 18, 2026", orderNumber: "HOLA-104822", pointsEarned: 15, rewardRedeemed: null, runningTotal: 245 },
  { id: "ph2", date: "July 12, 2026", orderNumber: "HOLA-103390", pointsEarned: 20, rewardRedeemed: null, runningTotal: 230 },
  { id: "ph3", date: "July 5, 2026", orderNumber: "HOLA-101987", pointsEarned: 0, rewardRedeemed: "Free Americano", runningTotal: 210 },
  { id: "ph4", date: "June 28, 2026", orderNumber: "HOLA-099213", pointsEarned: 18, rewardRedeemed: null, runningTotal: 360 },
];

const demoRedeemedHistory: RedeemedReward[] = [
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

function formatDate(date: Date) {
  return date.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
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
  isLoadingAccount: boolean;
  redeemReward: (reward: Reward) => Promise<boolean>;
  clearActiveRewardQr: () => void;
};

const LoyaltyContext = createContext<LoyaltyContextValue | null>(null);

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const isGuest = status === "unauthenticated";

  // Real users (including brand-new sign ups) always start at 0 — never the
  // guest demo number — until their real balance loads from the database.
  const [points, setPoints] = useState(0);
  const [ordersCompleted, setOrdersCompleted] = useState(0);
  const [redeemedHistory, setRedeemedHistory] = useState<RedeemedReward[]>([]);
  const [pointsHistory, setPointsHistory] = useState<PointsHistoryEntry[]>([]);
  const [activeRewardQr, setActiveRewardQr] = useState<ActiveRewardQr | null>(null);
  const [isLoadingAccount, setIsLoadingAccount] = useState(true);

  // Applying guest demo defaults is a synchronous, one-time state adjustment
  // (not an async fetch), so it belongs in the render body per React's
  // "adjusting state when a value changes" pattern — not inside an effect.
  const [appliedGuestDefaults, setAppliedGuestDefaults] = useState(false);
  if (isGuest && !appliedGuestDefaults) {
    setAppliedGuestDefaults(true);
    setPoints(DEMO_STARTING_POINTS);
    setOrdersCompleted(DEMO_ORDERS_COMPLETED);
    setRedeemedHistory(demoRedeemedHistory);
    setPointsHistory(demoPointsHistory);
    setIsLoadingAccount(false);
  }

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;
    (async () => {
      try {
        const { getMyLoyaltySummary } = await import("@/actions/loyalty");
        const summary = await getMyLoyaltySummary();
        if (cancelled || !summary) return;
        setPoints(summary.points);
        setOrdersCompleted(summary.ordersCompleted);
        setRedeemedHistory(summary.redeemedHistory);
        setPointsHistory(summary.pointsHistory);
      } catch (error) {
        console.error("[loyalty] failed to load account balance:", error);
      } finally {
        if (!cancelled) setIsLoadingAccount(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status]);

  const redeemReward = useCallback(
    async (reward: Reward) => {
      if (points < reward.points) return false;

      if (isGuest) {
        // Local-only simulation for signed-out demo browsing.
        setPoints((p) => p - reward.points);
        const now = Date.now();
        setActiveRewardQr({
          rewardId: reward.id,
          rewardName: reward.name,
          points: reward.points,
          generatedAt: now,
          expiresAt: now + 30 * 60 * 1000,
          qrToken: makeId(),
        });
        setRedeemedHistory((prev) => [
          {
            id: makeId(),
            rewardId: reward.id,
            rewardName: reward.name,
            points: reward.points,
            date: formatDate(new Date()),
            status: "Redeemed",
          },
          ...prev,
        ]);
        return true;
      }

      try {
        const { redeemReward: redeemRewardAction } = await import("@/actions/rewards");
        const redemption = await redeemRewardAction(reward.id);

        setPoints((p) => p - reward.points);
        setActiveRewardQr({
          rewardId: reward.id,
          rewardName: reward.name,
          points: reward.points,
          generatedAt: Date.now(),
          expiresAt: redemption.expiresAt.getTime(),
          qrToken: redemption.qrToken,
        });
        setRedeemedHistory((prev) => [
          {
            id: redemption.id,
            rewardId: reward.id,
            rewardName: reward.name,
            points: reward.points,
            date: formatDate(new Date()),
            status: "Redeemed",
          },
          ...prev,
        ]);
        return true;
      } catch (error) {
        console.error("[loyalty] redeemReward failed:", error);
        return false;
      }
    },
    [points, isGuest]
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
    isLoadingAccount,
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
