"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Info,
  MapPin,
  QrCode,
  ReceiptText,
  ScanLine,
  ShoppingBag,
  Store,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatSize, formatSweetness } from "@/lib/menu-data";

function formatDateTime(iso: string) {
  const date = new Date(iso);
  return {
    date: date.toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

const steps = [
  { Icon: ScanLine, title: "Show your QR", copy: "Let our cashier scan this order ticket." },
  { Icon: ReceiptText, title: "Pay at the counter", copy: "Confirm your order and complete payment." },
  { Icon: Clock3, title: "Follow it live", copy: "Track each update until it is ready." },
];

export default function OrderQrPage() {
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <section className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden bg-hola-beige px-4 py-24 text-center">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-hola-yellow/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-hola-blue/10 blur-3xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white shadow-xl">
          <ShoppingBag className="h-9 w-9 text-hola-blue" />
        </div>
        <h1 className="relative mt-6 text-3xl text-hola-brown sm:text-4xl">No active QR order</h1>
        <p className="relative mt-3 max-w-md leading-7 text-hola-brown-soft">
          Pick your HOLA favorites from the menu, then generate a QR ticket for the cashier.
        </p>
        <Link href="/menu" className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-hola-brown px-7 py-3.5 font-display text-white transition hover:-translate-y-0.5 hover:bg-hola-blue-dark">
          Explore the menu <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  const order = lastOrder;
  const { date, time } = formatDateTime(order.createdAt);
  const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className="relative min-h-screen overflow-hidden bg-hola-beige px-4 py-10 sm:py-16">
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-hola-yellow/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-hola-blue/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Link href="/menu" className="mb-7 inline-flex items-center gap-2 text-sm font-display text-hola-brown-soft transition hover:text-hola-blue-dark">
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>

        <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-9 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hola-yellow/40 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-hola-brown-soft">
            <QrCode className="h-4 w-4 text-hola-blue" /> Counter order ticket
          </span>
          <h1 className="mt-4 text-4xl text-hola-brown sm:text-5xl">Your HOLA order is ready to scan</h1>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-hola-brown-soft">
            Keep this screen open and present the QR code at the cashier. We will take it from there.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="grid overflow-hidden rounded-[2.25rem] bg-white shadow-[0_30px_90px_-45px_rgba(74,51,37,.65)] lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative flex flex-col items-center justify-center overflow-hidden bg-hola-blue-dark p-7 text-center text-white sm:p-10">
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:20px_20px]" />
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-white/60">Scan at the cashier</p>
            <div className="relative mt-5 rounded-[2rem] bg-white p-5 shadow-2xl ring-8 ring-white/10 sm:p-6">
              <span className="absolute -left-2 -top-2 h-8 w-8 rounded-tl-xl border-l-4 border-t-4 border-hola-yellow" />
              <span className="absolute -right-2 -top-2 h-8 w-8 rounded-tr-xl border-r-4 border-t-4 border-hola-yellow" />
              <span className="absolute -bottom-2 -left-2 h-8 w-8 rounded-bl-xl border-b-4 border-l-4 border-hola-yellow" />
              <span className="absolute -bottom-2 -right-2 h-8 w-8 rounded-br-xl border-b-4 border-r-4 border-hola-yellow" />
              <QRCode value={order.qrToken} size={220} fgColor="#362318" bgColor="#FFFFFF" className="h-auto w-[210px] sm:w-[240px]" />
            </div>
            <p className="relative mt-7 text-xs uppercase tracking-[0.16em] text-white/50">Order number</p>
            <p className="relative mt-1 font-display text-2xl tracking-wide text-hola-yellow">{order.orderNumber}</p>
            <div className="relative mt-6 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/75">
              <Store className="h-4 w-4 text-hola-yellow" /> Self pickup · Pay at counter
            </div>
          </div>

          <div className="p-6 sm:p-9 lg:p-11">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-hola-beige pb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-hola-blue-dark">Order summary</p>
                <h2 className="mt-2 text-2xl text-hola-brown">{itemCount} {itemCount === 1 ? "item" : "items"} for pickup</h2>
              </div>
              <div className="rounded-2xl bg-hola-beige px-4 py-3 text-right text-xs text-hola-brown-soft">
                <p>{date}</p><p className="mt-1 font-semibold text-hola-brown">{time}</p>
              </div>
            </div>

            <ul className="mt-5 max-h-[315px] space-y-3 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <li key={item.cartItemId} className="rounded-2xl border border-hola-beige bg-hola-beige/45 p-4 transition hover:border-hola-yellow/50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-hola-brown">{item.quantity}× {item.name}</p>
                      <p className="mt-1 text-xs text-hola-brown-soft">{formatSize(item.size)} · {formatSweetness(item.sweetness)}</p>
                      {item.instructions && <p className="mt-2 text-xs italic text-hola-brown-soft/80">“{item.instructions}”</p>}
                    </div>
                    <p className="whitespace-nowrap font-display text-hola-blue-dark">₱{item.unitPrice * item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-end justify-between border-t border-hola-beige pt-5">
              <div><p className="text-xs text-hola-brown-soft">Estimated total</p><p className="mt-1 text-xs text-hola-brown-soft/70">Final payment at counter</p></div>
              <span className="font-display text-3xl text-hola-blue-dark">₱{order.total}</span>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-hola-yellow-soft/45 p-4 text-sm leading-6 text-hola-brown">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-hola-blue-dark" />
              <p>Your order starts after the cashier scans this ticket and confirms your payment.</p>
            </div>

            <Link href="/order/status" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-hola-blue px-6 py-3.5 font-display text-white shadow-lg shadow-hola-blue/15 transition hover:-translate-y-0.5 hover:bg-hola-blue-dark">
              Track live order status <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 grid gap-3 sm:grid-cols-3">
          {steps.map(({ Icon, title, copy }, index) => (
            <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/65 p-4 backdrop-blur-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hola-brown text-white"><Icon className="h-5 w-5" /></span>
              <div><p className="font-display text-sm text-hola-brown"><span className="mr-1 text-hola-blue">{index + 1}.</span> {title}</p><p className="mt-1 text-xs leading-5 text-hola-brown-soft">{copy}</p></div>
            </div>
          ))}
        </motion.div>

        <p className="mt-7 flex items-center justify-center gap-2 text-center text-xs text-hola-brown-soft/70">
          <MapPin className="h-3.5 w-3.5" /> Available for in-store self pickup only
        </p>
      </div>
    </section>
  );
}
