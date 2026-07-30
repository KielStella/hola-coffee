"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { Download, Save, ArrowLeft, Info, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

function formatDateTime(iso: string) {
  const date = new Date(iso);
  return {
    date: date.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" }),
    time: date.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function OrderQrPage() {
  const { lastOrder } = useCart();
  const qrWrapperRef = useRef<HTMLDivElement>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  if (!lastOrder) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-hola-brown-soft/40" />
        <h1 className="mt-5 text-2xl text-hola-brown">No active QR order.</h1>
        <p className="mt-2 text-hola-brown-soft">
          Add items to your cart and generate a QR order from the Menu page.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-hola-blue px-6 py-3 font-display text-white transition hover:bg-hola-blue-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Menu
        </Link>
      </section>
    );
  }

  const order = lastOrder;
  const { date, time } = formatDateTime(order.createdAt);
  const qrPayload = order.qrToken;

  function downloadAsSvg() {
    const svg = qrWrapperRef.current?.querySelector("svg");
    if (!svg) return;
    const serialized = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([serialized], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${order.orderNumber}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setSavedMessage("QR code downloaded.");
  }

  function saveAsPng() {
    const svg = qrWrapperRef.current?.querySelector("svg");
    if (!svg) return;
    const serialized = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width || 256;
      canvas.height = img.height || 256;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) return;
          const pngUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = pngUrl;
          link.download = `${order.orderNumber}.png`;
          link.click();
          URL.revokeObjectURL(pngUrl);
        });
      }
      URL.revokeObjectURL(url);
      setSavedMessage("QR code saved to your device.");
    };
    img.src = url;
  }

  return (
    <section className="bg-hola-beige px-4 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hola-shadow mx-auto max-w-xl rounded-hola-lg bg-white p-6 sm:p-10"
      >
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-hola-blue/10 px-4 py-1.5 text-sm font-semibold text-hola-blue-dark">
            Order Ticket
          </span>
          <h1 className="mt-4 text-3xl text-hola-brown">Your QR Order</h1>
          <p className="mt-1 font-display text-hola-blue-dark">{order.orderNumber}</p>
        </div>

        <div ref={qrWrapperRef} className="mx-auto mt-6 w-fit rounded-hola-md border-4 border-hola-beige p-4">
          <QRCode value={qrPayload} size={192} fgColor="#4A3325" bgColor="#FFFFFF" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-hola-brown-soft">
          <div>
            <p className="font-semibold text-hola-brown">Date</p>
            <p>{date}</p>
          </div>
          <div>
            <p className="font-semibold text-hola-brown">Time</p>
            <p>{time}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-hola-beige pt-6">
          <h2 className="font-display text-lg text-hola-brown">Products Ordered</h2>
          <ul className="mt-3 space-y-3">
            {order.items.map((item) => (
              <li key={item.cartItemId} className="rounded-hola-sm bg-hola-beige p-3 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-hola-brown">
                    {item.name} <span className="text-hola-brown-soft">× {item.quantity}</span>
                  </p>
                  <p className="whitespace-nowrap font-display text-hola-blue-dark">
                    ₱{item.unitPrice * item.quantity}
                  </p>
                </div>
                <p className="mt-1 text-xs text-hola-brown-soft">
                  {item.size} • {item.sweetness}
                </p>
                {item.instructions && (
                  <p className="mt-1 text-xs italic text-hola-brown-soft/80">&ldquo;{item.instructions}&rdquo;</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-hola-beige pt-6">
          <span className="font-display text-lg text-hola-brown">Estimated Total</span>
          <span className="font-display text-2xl text-hola-blue-dark">₱{order.total}</span>
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-hola-sm bg-hola-yellow-soft/50 p-3 text-xs leading-relaxed text-hola-brown">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-hola-brown-soft" />
          <p>
            <span className="font-semibold">Self Pickup Only.</span> Please proceed to the cashier,
            present this QR Code, and pay at the counter. Your order will only begin once your QR Code
            has been scanned by our staff.
          </p>
        </div>

        {savedMessage && (
          <p className="mt-3 text-center text-xs font-semibold text-hola-blue-dark" role="status">
            {savedMessage}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={downloadAsSvg}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-hola-brown px-6 py-3 font-display text-white transition hover:bg-hola-blue-dark"
          >
            <Download className="h-4 w-4" /> Download QR
          </button>
          <button
            onClick={saveAsPng}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-hola-brown/15 bg-white px-6 py-3 font-display text-hola-brown transition hover:border-hola-yellow"
          >
            <Save className="h-4 w-4" /> Save QR
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/order/status"
            className="flex-1 rounded-full bg-hola-blue px-6 py-3 text-center font-display text-white transition hover:bg-hola-blue-dark"
          >
            Track Order Status
          </Link>
          <Link
            href="/menu"
            className="flex-1 rounded-full border-2 border-hola-brown/15 bg-white px-6 py-3 text-center font-display text-hola-brown transition hover:border-hola-yellow"
          >
            Back to Menu
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
