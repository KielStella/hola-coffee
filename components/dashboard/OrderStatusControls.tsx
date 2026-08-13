"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/actions/orders";

const STATUS_FLOW = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED"] as const;

const statusStyles: Record<string, string> = {
  PENDING: "bg-gray-100 text-gray-600",
  CONFIRMED: "bg-hola-blue/10 text-hola-blue-dark",
  PREPARING: "bg-hola-yellow/30 text-hola-brown",
  READY: "bg-emerald-100 text-emerald-700",
  COMPLETED: "bg-hola-brown text-white",
  CANCELLED: "bg-red-100 text-red-600",
};

export default function OrderStatusControls({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  const currentIndex = STATUS_FLOW.indexOf(status as (typeof STATUS_FLOW)[number]);
  const nextStatus = currentIndex >= 0 && currentIndex < STATUS_FLOW.length - 1 ? STATUS_FLOW[currentIndex + 1] : null;

  function handleAdvance() {
    if (!nextStatus) return;
    startTransition(async () => {
      await updateOrderStatus(orderId, nextStatus);
      setStatus(nextStatus);
    });
  }

  function handleCancel() {
    startTransition(async () => {
      await updateOrderStatus(orderId, "CANCELLED");
      setStatus("CANCELLED");
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>{status}</span>
      {nextStatus && (
        <button
          onClick={handleAdvance}
          disabled={isPending}
          className="rounded-full bg-hola-blue px-3 py-1 text-xs font-semibold text-white transition hover:bg-hola-blue-dark disabled:opacity-60"
        >
          Mark {nextStatus.replace("_", " ")}
        </button>
      )}
      {status !== "COMPLETED" && status !== "CANCELLED" && (
        <button
          onClick={handleCancel}
          disabled={isPending}
          className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
