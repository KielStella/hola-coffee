"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { X, Plus, Minus, Trash2, ShoppingBag, QrCode, Info } from "lucide-react";
import ProductArt from "../menu/ProductArt";
import { useCart } from "@/lib/cart-context";
import { getProductById } from "@/lib/menu-data";

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    generateOrder,
  } = useCart();

  function handleGenerateOrder() {
    const order = generateOrder();
    if (order) {
      router.push("/order/qr");
    }
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex justify-end bg-hola-brown/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDrawer}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >
          <motion.div
            className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-hola-beige px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-xl text-hola-brown">
                <ShoppingBag className="h-5 w-5" /> Your Order
              </h2>
              <button
                onClick={closeDrawer}
                aria-label="Close cart"
                className="rounded-full p-1.5 text-hola-brown-soft transition hover:bg-hola-beige"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-12 w-12 text-hola-brown-soft/40" />
                  <p className="mt-4 font-display text-lg text-hola-brown">Your cart is empty.</p>
                  <p className="mt-1 text-sm text-hola-brown-soft">Browse our delicious menu.</p>
                  <button
                    onClick={() => {
                      closeDrawer();
                      router.push("/menu");
                    }}
                    className="mt-5 rounded-full bg-hola-blue px-6 py-2.5 font-display text-white transition hover:bg-hola-blue-dark"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    return (
                      <li
                        key={item.cartItemId}
                        className="flex gap-3 rounded-hola-md border border-hola-beige p-3"
                      >
                        {product && (
                          <ProductArt
                            category={product.category}
                            name={product.name}
                            className="h-16 w-16 shrink-0 rounded-hola-sm"
                            iconClassName="h-8 w-8"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-display text-sm text-hola-brown">{item.name}</p>
                            <button
                              onClick={() => removeItem(item.cartItemId)}
                              aria-label={`Remove ${item.name}`}
                              className="text-hola-brown-soft/60 transition hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-hola-brown-soft">
                            {item.size} • {item.sweetness}
                          </p>
                          {item.instructions && (
                            <p className="mt-0.5 text-xs italic text-hola-brown-soft/80">
                              &ldquo;{item.instructions}&rdquo;
                            </p>
                          )}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decreaseQuantity(item.cartItemId)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-hola-beige text-hola-brown transition hover:bg-hola-yellow-soft"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-5 text-center text-sm font-semibold text-hola-brown">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseQuantity(item.cartItemId)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-hola-beige text-hola-brown transition hover:bg-hola-yellow-soft"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <p className="font-display text-sm text-hola-blue-dark">
                              ₱{item.unitPrice * item.quantity}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-hola-beige px-5 py-5">
                <div className="flex items-start gap-2 rounded-hola-sm bg-hola-yellow-soft/50 p-3 text-xs leading-relaxed text-hola-brown">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-hola-brown-soft" />
                  <p>
                    <span className="font-semibold">Self Pickup Only.</span> This café does not provide
                    delivery. After generating your QR Code, please proceed to the cashier, present your
                    QR Code, pay at the cashier, and wait until your order status becomes{" "}
                    <span className="font-semibold">Ready for Pickup</span>.
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-hola-brown">Subtotal</span>
                  <span className="font-display text-lg text-hola-brown">₱{subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-hola-brown-soft">
                  <span>Total</span>
                  <span>₱{subtotal}</span>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={handleGenerateOrder}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-hola-blue px-6 py-3.5 font-display text-white shadow-lg shadow-hola-blue/30 transition hover:-translate-y-0.5 hover:bg-hola-blue-dark hover:shadow-xl"
                  >
                    <QrCode className="h-5 w-5" /> Generate QR Order
                  </button>
                  <button
                    onClick={closeDrawer}
                    className="rounded-full border-2 border-hola-brown/15 bg-white px-6 py-3 font-display text-hola-brown transition hover:border-hola-yellow"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
