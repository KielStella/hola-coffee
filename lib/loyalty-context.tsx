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

const NEXT_REWARD_TARGET = 300;
const NEXT_REWARD_NAME = "Free Spanish Latte";

function getTier(points: number): Tier {
  if (points >= 1000) return "Gold";
  if (points >= 400) return "Silver";
  return "Bronze";
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

  // Signed-out visitors and brand-new accounts start at zero until a real
  // account balance is loaded from the database.
  const [points, setPoints] = useState(0);
  const [ordersCompleted, setOrdersCompleted] = useState(0);
  const [redeemedHistory, setRedeemedHistory] = useState<RedeemedReward[]>([]);
  const [pointsHistory, setPointsHistory] = useState<PointsHistoryEntry[]>([]);
  const [activeRewardQr, setActiveRewardQr] = useState<ActiveRewardQr | null>(null);
  const [isLoadingAccount, setIsLoadingAccount] = useState(status !== "unauthenticated");

  const [previousStatus, setPreviousStatus] = useState(status);
  if (status !== previousStatus) {
    setPreviousStatus(status);
    if (status === "unauthenticated") {
      setPoints(0);
      setOrdersCompleted(0);
      setRedeemedHistory([]);
      setPointsHistory([]);
      setActiveRewardQr(null);
      setIsLoadingAccount(false);
    } else if (status === "authenticated") {
      setIsLoadingAccount(true);
    }
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

      if (isGuest) return false;

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
