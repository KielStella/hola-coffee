"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BellRing, Check, CheckCircle2, ChefHat, Circle, Clock3, PackageCheck, RefreshCw, ShoppingBag, XCircle } from "lucide-react";
import { getPublicOrderStatus } from "@/actions/orders";
import { useCart } from "@/lib/cart-context";

const statusFlow = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED"] as const;
const statusInfo = {
  PENDING: { title: "Waiting for confirmation", message: "Present your QR code to the cashier so the team can confirm your order.", Icon: Clock3 },
  CONFIRMED: { title: "Order confirmed", message: "Payment is confirmed. Your order will enter preparation next.", Icon: CheckCircle2 },
  PREPARING: { title: "Your order is being prepared", message: "The HOLA team is carefully making your order now.", Icon: ChefHat },
  READY: { title: "Ready for pickup!", message: "Please head to the counter and show your order number.", Icon: PackageCheck },
  COMPLETED: { title: "Order completed", message: "Enjoy your HOLA moment. Thank you for ordering!", Icon: Check },
  CANCELLED: { title: "Order cancelled", message: "Please speak with our team if you need assistance.", Icon: XCircle },
} as const;
type OrderStatus = keyof typeof statusInfo;

export default function OrderStatusPage() {
  const { lastOrder } = useCart();
  const [status, setStatus] = useState<OrderStatus>(lastOrder?.status ?? "PENDING");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const initialized = useRef(false);

  const refreshStatus = useCallback((announce = false) => {
    if (!lastOrder?.qrToken) return;
    startTransition(async () => {
      try {
        const latest = await getPublicOrderStatus(lastOrder.qrToken);
        if (!latest) { setError("We could not find this order. Please show your QR code to the cashier."); return; }
        const nextStatus = latest.status as OrderStatus;
        setError(null); setLastUpdated(new Date());
        setStatus(previous => {
          if (initialized.current && previous !== nextStatus) {
            const message = statusInfo[nextStatus].title;
            setNotice(message);
            if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") new Notification("HOLA order update", { body: message });
          } else if (announce) setNotice("Status refreshed—you're up to date.");
          initialized.current = true;
          return nextStatus;
        });
      } catch { setError("Could not refresh right now. Please check your connection and try again."); }
    });
  }, [lastOrder]);

  useEffect(() => {
    refreshStatus(false);
    if (!lastOrder || status === "COMPLETED" || status === "CANCELLED") return;
    const interval = window.setInterval(() => refreshStatus(false), 15000);
    return () => window.clearInterval(interval);
  }, [lastOrder, status, refreshStatus]);

  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(null), 4500); return () => window.clearTimeout(timer); }, [notice]);

  if (!lastOrder) return <section className="flex min-h-[65vh] flex-col items-center justify-center bg-hola-beige px-4 text-center"><ShoppingBag className="h-12 w-12 text-hola-brown-soft/35" /><h1 className="mt-5 text-3xl text-hola-brown">No active order to track.</h1><p className="mt-2 text-hola-brown-soft">Place an order from the menu to see live updates here.</p><Link href="/menu" className="mt-6 rounded-full bg-hola-brown px-6 py-3 font-display text-white">Browse menu</Link></section>;

  const currentIndex = status === "CANCELLED" ? -1 : statusFlow.indexOf(status as (typeof statusFlow)[number]);
  const info = statusInfo[status];
  const CurrentIcon = info.Icon;
  return <section className="min-h-[75vh] bg-hola-beige px-4 py-14 sm:py-20">
    <AnimatePresence>{notice && <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} role="status" className="fixed left-1/2 top-24 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-hola-brown px-5 py-3 text-sm text-white shadow-2xl"><BellRing className="h-4 w-4 text-hola-yellow" />{notice}</motion.div>}</AnimatePresence>
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] bg-white shadow-[0_30px_80px_-45px_rgba(74,51,37,.7)]">
      <div className={`p-7 text-center text-white sm:p-10 ${status === "READY" ? "bg-emerald-600" : status === "CANCELLED" ? "bg-red-500" : "bg-hola-blue-dark"}`}><motion.span key={status} initial={{scale:.75,opacity:0}} animate={{scale:1,opacity:1}} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15"><CurrentIcon className="h-10 w-10 text-hola-yellow" /></motion.span><p className="mt-5 text-xs font-bold uppercase tracking-[.17em] text-white/60">{lastOrder.orderNumber}</p><h1 className="mt-2 text-3xl sm:text-4xl">{info.title}</h1><p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-white/75">{info.message}</p></div>
      <div className="p-6 sm:p-10">
        {status !== "CANCELLED" && <div className="relative"><div className="absolute left-[10%] right-[10%] top-5 h-1 rounded-full bg-hola-beige" /><motion.div initial={{width:0}} animate={{width:`${currentIndex/(statusFlow.length-1)*80}%`}} className="absolute left-[10%] top-5 h-1 rounded-full bg-hola-blue" /><ol className="relative grid grid-cols-5 gap-1">{statusFlow.map((item,index) => {const complete=index<=currentIndex; return <li key={item} className="text-center"><span className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${complete ? "bg-hola-blue text-white" : "bg-hola-beige text-hola-brown-soft"}`}>{complete ? <Check className="h-5 w-5" /> : <Circle className="h-4 w-4" />}</span><span className={`mt-2 block text-[10px] font-semibold leading-4 sm:text-xs ${complete ? "text-hola-brown" : "text-hola-brown-soft/50"}`}>{item === "READY" ? "Ready" : item[0]+item.slice(1).toLowerCase()}</span></li>})}</ol></div>}
        <div className="mt-9 flex flex-col items-center justify-between gap-4 rounded-[1.5rem] bg-hola-beige p-5 sm:flex-row"><div><p className="font-display text-hola-brown">Live order tracking</p><p className="mt-1 text-xs text-hola-brown-soft">{lastUpdated ? `Last updated ${lastUpdated.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}` : "Checking the latest status…"}</p></div><button type="button" onClick={() => refreshStatus(true)} disabled={isPending} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-display text-hola-brown shadow-sm transition hover:-translate-y-1 disabled:opacity-60"><RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />{isPending ? "Refreshing…" : "Refresh status"}</button></div>
        {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-600" role="alert">{error}</p>}
        <div className="mt-8 border-t border-hola-beige pt-6"><h2 className="font-display text-xl text-hola-brown">Order summary</h2><ul className="mt-3 space-y-2">{lastOrder.items.map(item => <li key={item.cartItemId} className="flex justify-between gap-4 text-sm text-hola-brown-soft"><span>{item.name} × {item.quantity}</span><span>₱{item.unitPrice*item.quantity}</span></li>)}</ul><div className="mt-4 flex justify-between border-t border-hola-beige pt-4 font-display text-hola-brown"><span>Total</span><span>₱{lastOrder.total}</span></div></div>
        <Link href="/menu" className="mt-8 inline-flex items-center gap-2 text-sm font-display text-hola-blue-dark"><ArrowLeft className="h-4 w-4" /> Back to menu</Link>
      </div>
    </motion.div>
  </section>;
}
