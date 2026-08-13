import { QrCode, Store } from "lucide-react";

export default function OrderSourceBadge({ source }: { source: "QR" | "WALK_IN" }) {
  const isWalkIn = source === "WALK_IN";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isWalkIn ? "bg-hola-yellow/30 text-hola-brown" : "bg-hola-blue/10 text-hola-blue-dark"
      }`}
    >
      {isWalkIn ? <Store className="h-3 w-3" /> : <QrCode className="h-3 w-3" />}
      {isWalkIn ? "Walk-In" : "QR"}
    </span>
  );
}
