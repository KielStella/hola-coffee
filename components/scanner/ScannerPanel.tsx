"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import QrScanner from "./QrScanner";
import { formatSize, formatSweetness } from "@/lib/menu-data";
import OrderSourceBadge from "@/components/dashboard/OrderSourceBadge";
import { getOrderByQrToken, updateOrderStatus } from "@/actions/orders";
import { getRedemptionByQrToken, approveRewardRedemption, cancelRewardRedemption } from "@/actions/rewards";

type ScanResult =
  | { kind: "order"; data: Awaited<ReturnType<typeof getOrderByQrToken>> }
  | { kind: "reward"; data: Awaited<ReturnType<typeof getRedemptionByQrToken>> }
  | { kind: "not_found" }
  | null;

const ORDER_STATUS_FLOW = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED"] as const;
const ORDER_ACTION_LABELS: Record<string, string> = { CONFIRMED: "Confirm order", PREPARING: "Start preparing", READY: "Mark ready", COMPLETED: "Mark completed" };

export default function ScannerPanel() {
  const [result, setResult] = useState<ScanResult>(null);
  const [isPending, startTransition] = useTransition();
  const [scanKey, setScanKey] = useState(0);

  async function handleScan(token: string) {
    if (result) return; // ignore further scans until reset
    const order = await getOrderByQrToken(token);
    if (order) {
      setResult({ kind: "order", data: order });
      return;
    }
    const redemption = await getRedemptionByQrToken(token);
    if (redemption) {
      setResult({ kind: "reward", data: redemption });
      return;
    }
    setResult({ kind: "not_found" });
  }

  function reset() {
    setResult(null);
    setScanKey((k) => k + 1);
  }

  function advanceScannedOrder(status: (typeof ORDER_STATUS_FLOW)[number] | "CANCELLED") {
    if (result?.kind !== "order" || !result.data) return;
    const orderId = result.data.id;
    startTransition(async () => {
      await updateOrderStatus(orderId, status);
      setResult(current => current?.kind === "order" && current.data ? { kind: "order", data: { ...current.data, status } } : current);
    });
  }

  return (
    <div>
      {!result ? (
        <QrScanner key={scanKey} onScan={handleScan} />
      ) : result.kind === "not_found" ? (
        <div className="mx-auto max-w-sm rounded-hola-lg bg-white p-6 text-center shadow-md">
          <XCircle className="mx-auto h-10 w-10 text-red-500" />
          <p className="mt-3 font-display text-hola-brown">QR code not recognized.</p>
          <button
            onClick={reset}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-hola-blue px-5 py-2.5 text-sm font-display text-white hover:bg-hola-blue-dark"
          >
            <RotateCcw className="h-4 w-4" /> Scan Again
          </button>
        </div>
      ) : result.kind === "order" && result.data ? (
        <div className="mx-auto max-w-md rounded-hola-lg bg-white p-6 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wide text-hola-brown-soft">Order</p>
          <h2 className="mt-1 flex items-center gap-2 font-display text-xl text-hola-brown">
            {result.data.orderNumber}
            <OrderSourceBadge source={result.data.source} />
          </h2>
          <p className="text-sm text-hola-brown-soft">{result.data.user?.name ?? result.data.guestName ?? "Guest"}</p>

          <ul className="mt-4 space-y-2 text-sm">
            {result.data.items.map((item) => (
              <li key={item.id} className="flex justify-between rounded-hola-sm bg-hola-beige px-3 py-2">
                <span>
                  {item.productName} × {item.quantity} ({formatSize(item.size)}, {formatSweetness(item.sweetness)})
                </span>
                <span className="font-display text-hola-blue-dark">₱{item.unitPrice * item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between font-display text-hola-brown">
            <span>Total</span>
            <span>₱{result.data.total}</span>
          </div>

          <p className="mt-3 text-sm">
            Current status:{" "}
            <span className="rounded-full bg-hola-blue/10 px-2.5 py-1 text-xs font-semibold text-hola-blue-dark">
              {result.data.status}
            </span>
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {(() => {
              const index = ORDER_STATUS_FLOW.indexOf(result.data!.status as (typeof ORDER_STATUS_FLOW)[number]);
              const nextStatus = index >= 0 && index < ORDER_STATUS_FLOW.length - 1 ? ORDER_STATUS_FLOW[index + 1] : null;
              return nextStatus ? (
              <button
                key={nextStatus}
                disabled={isPending}
                onClick={() => advanceScannedOrder(nextStatus)}
                className="rounded-full bg-hola-brown px-4 py-2 text-xs font-semibold text-white transition hover:bg-hola-blue-dark disabled:opacity-60"
              >
                {isPending ? "Updating…" : ORDER_ACTION_LABELS[nextStatus]}
              </button>
              ) : null;
            })()}
            {result.data.status !== "READY" && result.data.status !== "COMPLETED" && result.data.status !== "CANCELLED" && <button
              disabled={isPending}
              onClick={() => advanceScannedOrder("CANCELLED")}
              className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
            >
              Cancel Order
            </button>}
          </div>

          <button
            onClick={reset}
            className="mt-4 inline-flex items-center gap-2 text-sm text-hola-brown-soft hover:text-hola-brown"
          >
            <RotateCcw className="h-4 w-4" /> Scan Another
          </button>
        </div>
      ) : result.kind === "reward" && result.data ? (
        <div className="mx-auto max-w-md rounded-hola-lg bg-white p-6 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wide text-hola-brown-soft">Reward Redemption</p>
          <h2 className="mt-1 font-display text-xl text-hola-brown">{result.data.reward.name}</h2>
          <p className="text-sm text-hola-brown-soft">{result.data.user.name}</p>
          <p className="mt-2 text-sm">
            <span className="font-display text-hola-blue-dark">{result.data.points} points</span> ·{" "}
            <span className="rounded-full bg-hola-beige px-2.5 py-1 text-xs font-semibold text-hola-brown">
              {result.data.status}
            </span>
          </p>
          <p className="mt-1 text-xs text-hola-brown-soft">
            Expires {new Date(result.data.expiresAt).toLocaleTimeString()}
          </p>

          {result.data.status === "PENDING" ? (
            <div className="mt-5 flex gap-2">
              <button
                disabled={isPending}
                onClick={() =>
                  startTransition(async () => {
                    await approveRewardRedemption(result.data!.id);
                    reset();
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-hola-blue px-5 py-2.5 text-sm font-display text-white transition hover:bg-hola-blue-dark disabled:opacity-60"
              >
                <CheckCircle2 className="h-4 w-4" /> Approve
              </button>
              <button
                disabled={isPending}
                onClick={() =>
                  startTransition(async () => {
                    await cancelRewardRedemption(result.data!.id);
                    reset();
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                <XCircle className="h-4 w-4" /> Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={reset}
              className="mt-4 inline-flex items-center gap-2 text-sm text-hola-brown-soft hover:text-hola-brown"
            >
              <RotateCcw className="h-4 w-4" /> Scan Another
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
