"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, CheckCircle2 } from "lucide-react";
import ProductArt from "./ProductArt";
import { useCart } from "@/lib/cart-context";
import {
  sizeAdjustments,
  sizeOptions,
  sweetnessOptions,
  formatSize,
  formatSweetness,
  type MenuProduct,
  type SizeOption,
  type SweetnessOption,
} from "@/lib/menu-data";

export default function ProductModal({
  product,
  onClose,
}: {
  product: MenuProduct | null;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState<SizeOption>("MEDIUM");
  const [sweetness, setSweetness] = useState<SweetnessOption>("ORIGINAL");
  const [instructions, setInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function resetAndClose() {
    setSize("MEDIUM");
    setSweetness("ORIGINAL");
    setInstructions("");
    setQuantity(1);
    setJustAdded(false);
    onClose();
  }

  if (!product) return null;

  const unitPrice = product.basePrice + sizeAdjustments[size];
  const total = unitPrice * quantity;

  function handleAddToOrder() {
    if (!product) return;
    addItem({ product, size, sweetness, instructions, quantity });
    setJustAdded(true);
    setTimeout(() => {
      resetAndClose();
    }, 900);
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-hola-brown/50 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} details`}
        >
          <motion.div
            className="hola-shadow max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2.5rem] bg-white sm:rounded-[2.5rem]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-72">
              <ProductArt category={product.category} name={product.name} image={product.image} className="h-full w-full" iconClassName="h-24 w-24" />
              <button
                onClick={resetAndClose}
                aria-label="Close details"
                className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-hola-brown shadow transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-xs font-bold uppercase tracking-[.16em] text-hola-blue-dark">{product.category}</p><h2 className="mt-1 text-3xl text-hola-brown">{product.name}</h2></div>
                <span className="whitespace-nowrap rounded-full bg-hola-beige px-4 py-2 font-display text-xl text-hola-blue-dark">
                  ₱{unitPrice}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-hola-brown-soft">{product.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-full bg-hola-beige px-3 py-1 text-xs font-medium text-hola-brown-soft"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <fieldset className="mt-7">
                <legend className="font-display text-base text-hola-brown">HOLA Size</legend>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {sizeOptions.map((option) => (
                    <label
                      key={option}
                      className={`cursor-pointer rounded-hola-sm border-2 px-3 py-2.5 text-center text-sm font-semibold transition ${
                        size === option
                          ? "border-hola-blue bg-hola-blue/10 text-hola-blue-dark"
                          : "border-hola-brown/10 text-hola-brown-soft hover:border-hola-blue/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={option}
                        checked={size === option}
                        onChange={() => setSize(option)}
                        className="sr-only"
                      />
                      {formatSize(option)}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-6">
                <legend className="font-display text-base text-hola-brown">Sweetness Preference</legend>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {sweetnessOptions.map((option) => (
                    <label
                      key={option}
                      className={`cursor-pointer rounded-hola-sm border-2 px-3 py-2.5 text-center text-sm font-semibold transition ${
                        sweetness === option
                          ? "border-hola-blue bg-hola-blue/10 text-hola-blue-dark"
                          : "border-hola-brown/10 text-hola-brown-soft hover:border-hola-blue/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="sweetness"
                        value={option}
                        checked={sweetness === option}
                        onChange={() => setSweetness(option)}
                        className="sr-only"
                      />
                      {formatSweetness(option)}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6">
                <label htmlFor="special-instructions" className="font-display text-base text-hola-brown">
                  Special Instructions <span className="font-body text-sm font-normal text-hola-brown-soft">(optional)</span>
                </label>
                <textarea
                  id="special-instructions"
                  rows={3}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Add your special request here."
                  className="mt-2 w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-4 py-3 text-sm text-hola-brown outline-none transition placeholder:text-hola-brown-soft/60 focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30"
                />
                <p className="mt-1.5 text-xs text-hola-brown-soft/70">
                  e.g. No Ice, Don&apos;t put milk, Extra Espresso Shot, Extra Syrup, Less Foam
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-display text-sm text-hola-brown">Quantity</p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-hola-beige text-hola-brown transition hover:bg-hola-yellow-soft"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center font-display text-lg text-hola-brown">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-hola-beige text-hola-brown transition hover:bg-hola-yellow-soft"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="font-display text-lg text-hola-brown">Total: ₱{total}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToOrder}
                  disabled={justAdded}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-hola-brown px-8 py-3.5 font-display text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-hola-blue-dark hover:shadow-xl disabled:translate-y-0"
                >
                  {justAdded ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" /> Added!
                    </>
                  ) : (
                    "Add to Order"
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="rounded-full border-2 border-hola-brown/15 bg-white px-8 py-3.5 font-display text-hola-brown transition hover:-translate-y-0.5 hover:border-hola-yellow"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
