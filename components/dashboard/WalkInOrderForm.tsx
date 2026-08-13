"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { createWalkInOrder } from "@/actions/orders";
import {
  sizeOptions,
  sweetnessOptions,
  sizeAdjustments,
  formatSize,
  formatSweetness,
  type SizeOption,
  type SweetnessOption,
} from "@/lib/menu-data";

type Product = {
  id: string;
  name: string;
  basePrice: number;
  isAvailable: boolean;
  category: { label: string };
};

type WalkInLineItem = {
  key: string;
  productId: string;
  productName: string;
  size: SizeOption;
  sweetness: SweetnessOption;
  quantity: number;
  unitPrice: number;
};

const inputClass =
  "rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-3 py-2 text-sm text-hola-brown outline-none focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

export default function WalkInOrderForm({
  products,
  ordersBasePath,
}: {
  products: Product[];
  ordersBasePath: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [customerName, setCustomerName] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? "");
  const [size, setSize] = useState<SizeOption>("MEDIUM");
  const [sweetness, setSweetness] = useState<SweetnessOption>("ORIGINAL");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState<WalkInLineItem[]>([]);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableProducts = useMemo(() => products.filter((p) => p.isAvailable), [products]);
  const selectedProduct = availableProducts.find((p) => p.id === selectedProductId);
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  function handleAddItem() {
    if (!selectedProduct) return;
    const unitPrice = selectedProduct.basePrice + sizeAdjustments[size];
    setItems((prev) => [
      ...prev,
      {
        key: Math.random().toString(36).slice(2),
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        size,
        sweetness,
        quantity,
        unitPrice,
      },
    ]);
    setQuantity(1);
  }

  function removeItem(key: string) {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }

  function handleSubmitOrder() {
    if (items.length === 0) return;
    setError(null);
    startTransition(async () => {
      try {
        const order = await createWalkInOrder({
          customerName: customerName || undefined,
          items: items.map((i) => ({
            productId: i.productId,
            size: i.size,
            sweetness: i.sweetness,
            quantity: i.quantity,
          })),
        });
        setConfirmedOrderNumber(order.orderNumber);
        setItems([]);
        setCustomerName("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create the order.");
      }
    });
  }

  if (confirmedOrderNumber) {
    return (
      <div className="rounded-hola-lg bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h2 className="mt-4 font-display text-xl text-hola-brown">Walk-in order created</h2>
        <p className="mt-1 text-hola-brown-soft">
          Order <span className="font-semibold text-hola-brown">{confirmedOrderNumber}</span> is confirmed.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => setConfirmedOrderNumber(null)}
            className="rounded-full bg-hola-blue px-5 py-2.5 text-sm font-display text-white hover:bg-hola-blue-dark"
          >
            Ring Up Another
          </button>
          <button
            onClick={() => router.push(ordersBasePath)}
            className="rounded-full border border-hola-brown/15 px-5 py-2.5 text-sm text-hola-brown hover:bg-hola-beige"
          >
            View Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="rounded-hola-lg bg-white p-5 shadow-sm">
          <label className="mb-1.5 block text-sm font-semibold text-hola-brown">Customer Name (optional)</label>
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Walk-in guest"
            className={`${inputClass} w-full`}
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-hola-brown">Product</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className={`${inputClass} w-full`}
              >
                {availableProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.category.label} (₱{p.basePrice})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-hola-brown">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-hola-beige text-hola-brown hover:bg-hola-yellow-soft"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-display text-hola-brown">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-hola-beige text-hola-brown hover:bg-hola-yellow-soft"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-hola-brown">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as SizeOption)}
                className={`${inputClass} w-full`}
              >
                {sizeOptions.map((s) => (
                  <option key={s} value={s}>
                    {formatSize(s)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-hola-brown">Sweetness</label>
              <select
                value={sweetness}
                onChange={(e) => setSweetness(e.target.value as SweetnessOption)}
                className={`${inputClass} w-full`}
              >
                {sweetnessOptions.map((s) => (
                  <option key={s} value={s}>
                    {formatSweetness(s)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            disabled={!selectedProduct}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-hola-brown px-5 py-2.5 text-sm font-display text-white transition hover:bg-hola-blue-dark disabled:opacity-50"
          >
            <Plus className="h-4 w-4" /> Add to Order
          </button>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="rounded-hola-lg bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-lg text-hola-brown">
            <ShoppingBag className="h-5 w-5" /> Current Order
          </h2>

          {items.length === 0 ? (
            <p className="mt-4 text-sm text-hola-brown-soft">No items yet — add products from the left.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {items.map((item) => (
                <li key={item.key} className="flex items-start justify-between gap-2 rounded-hola-sm bg-hola-beige px-3 py-2 text-sm">
                  <div>
                    <p className="font-display text-hola-brown">
                      {item.productName} × {item.quantity}
                    </p>
                    <p className="text-xs text-hola-brown-soft">
                      {formatSize(item.size)} • {formatSweetness(item.sweetness)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="font-display text-hola-blue-dark">₱{item.unitPrice * item.quantity}</span>
                    <button onClick={() => removeItem(item.key)} aria-label="Remove item" className="text-hola-brown-soft hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-hola-beige pt-4 font-display text-hola-brown">
            <span>Total</span>
            <span>₱{total}</span>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <button
            onClick={handleSubmitOrder}
            disabled={items.length === 0 || isPending}
            className="mt-4 w-full rounded-full bg-hola-blue px-5 py-3 text-sm font-display text-white transition hover:bg-hola-blue-dark disabled:opacity-50"
          >
            {isPending ? "Creating Order…" : "Confirm Walk-In Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
