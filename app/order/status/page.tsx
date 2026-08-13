"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Clock, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const statuses = ["Pending", "Confirmed", "Preparing", "Ready for Pickup", "Completed"] as const;

/** Frontend-only demo: shows the order sitting at "Preparing".
 *  Live status updates will be wired to the backend in Prompt 2. */
const DEMO_STATUS_INDEX = 2;

export default function OrderStatusPage() {
  const { lastOrder } = useCart();

  return (
    <section className="bg-hola-beige px-4 py-14 sm:py-20">
      <div className="hola-shadow mx-auto max-w-2xl rounded-hola-lg bg-white p-6 sm:p-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-hola-blue/10 px-4 py-1.5 text-sm font-semibold text-hola-blue-dark">
            Order Tracking
          </span>
          <h1 className="mt-4 text-3xl text-hola-brown">Order Status</h1>
          {lastOrder && <p className="mt-1 font-display text-hola-blue-dark">{lastOrder.orderNumber}</p>}
        </div>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute left-0 top-4 h-1 w-full rounded-full bg-hola-beige" aria-hidden="true" />
            <div
              className="absolute left-0 top-4 h-1 rounded-full bg-hola-blue transition-all duration-700"
              style={{ width: `${(DEMO_STATUS_INDEX / (statuses.length - 1)) * 100}%` }}
              aria-hidden="true"
            />
            <ol className="relative grid grid-cols-5 gap-1">
              {statuses.map((status, i) => {
                const done = i <= DEMO_STATUS_INDEX;
                return (
                  <li key={status} className="flex flex-col items-center text-center">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        done ? "bg-hola-blue text-white" : "bg-hola-beige text-hola-brown-soft"
                      }`}
                    >
                      {done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-4 w-4" />}
                    </span>
                    <span
                      className={`mt-2 text-[11px] font-semibold leading-tight sm:text-xs ${
                        done ? "text-hola-brown" : "text-hola-brown-soft/60"
                      }`}
                    >
                      {status}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3 rounded-hola-sm bg-hola-beige p-4">
          <Clock className="h-5 w-5 shrink-0 text-hola-blue-dark" />
          <p className="text-sm text-hola-brown">
            Estimated waiting time: <span className="font-semibold">8–12 minutes</span>
          </p>
        </div>

        {lastOrder ? (
          <div className="mt-6 border-t border-hola-beige pt-6">
            <h2 className="font-display text-lg text-hola-brown">Order Summary</h2>
            <ul className="mt-3 space-y-2">
              {lastOrder.items.map((item) => (
                <li key={item.cartItemId} className="flex justify-between text-sm text-hola-brown-soft">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₱{item.unitPrice * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-hola-beige pt-3 font-display text-hola-brown">
              <span>Total</span>
              <span>₱{lastOrder.total}</span>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-center text-sm text-hola-brown-soft">
            This is a preview of the order tracking experience. Generate a QR order from the Menu to
            see your own order summary here.
          </p>
        )}

        <p className="mt-6 text-center text-xs text-hola-brown-soft/70">
          This page is read-only. Live status updates from our staff will be connected in a future
          update.
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-hola-blue px-6 py-3 font-display text-white transition hover:bg-hola-blue-dark"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
