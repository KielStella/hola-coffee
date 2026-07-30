"use client";

import { useState, useTransition } from "react";
import { Plus, X } from "lucide-react";
import { createProduct, updateProduct, deleteProduct, toggleProductAvailability } from "@/actions/menu";

type Category = { id: string; label: string; name: string };
type Product = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  basePrice: number;
  tag: string | null;
  isAvailable: boolean;
  categoryId: string;
  category: Category;
};

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-3 py-2 text-sm text-hola-brown outline-none focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

function ProductForm({
  categories,
  initial,
  onDone,
}: {
  categories: Category[];
  initial?: Product;
  onDone: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    ingredients: initial?.ingredients.join(", ") ?? "",
    basePrice: initial?.basePrice ?? 100,
    tag: initial?.tag ?? "",
    categoryId: initial?.categoryId ?? categories[0]?.id ?? "",
    isAvailable: initial?.isAvailable ?? true,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const payload = {
        name: form.name,
        description: form.description,
        ingredients: form.ingredients.split(",").map((s) => s.trim()).filter(Boolean),
        basePrice: Number(form.basePrice),
        tag: (form.tag || undefined) as "NEW" | "BEST_SELLER" | "SOLD_OUT" | undefined,
        categoryId: form.categoryId,
        isAvailable: form.isAvailable,
        isFeatured: false,
      };
      if (initial) {
        await updateProduct(initial.id, payload);
      } else {
        await createProduct(payload);
      }
      onDone();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-hola-lg bg-white p-5 shadow-md">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          placeholder="Name"
          className={inputClass}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          className={inputClass}
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <textarea
        required
        placeholder="Description"
        className={inputClass}
        rows={2}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Ingredients (comma separated)"
        className={inputClass}
        value={form.ingredients}
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          required
          type="number"
          placeholder="Price (₱)"
          className={inputClass}
          value={form.basePrice}
          onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })}
        />
        <select className={inputClass} value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}>
          <option value="">No Tag</option>
          <option value="NEW">New</option>
          <option value="BEST_SELLER">Best Seller</option>
          <option value="SOLD_OUT">Sold Out</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-hola-brown">
          <input
            type="checkbox"
            checked={form.isAvailable}
            onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
          />
          Available
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-hola-blue px-5 py-2 text-sm font-display text-white hover:bg-hola-blue-dark disabled:opacity-60"
        >
          {isPending ? "Saving…" : initial ? "Save Changes" : "Create Product"}
        </button>
        <button type="button" onClick={onDone} className="rounded-full border border-hola-brown/15 px-5 py-2 text-sm text-hola-brown">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function MenuManager({ categories, products }: { categories: Category[]; products: Product[] }) {
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-hola-brown-soft">{products.length} products</p>
        <button
          onClick={() => setCreating((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-hola-blue px-4 py-2 text-sm font-display text-white hover:bg-hola-blue-dark"
        >
          {creating ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {creating ? "Close" : "New Product"}
        </button>
      </div>

      {creating && (
        <div className="mt-4">
          <ProductForm categories={categories} onDone={() => setCreating(false)} />
        </div>
      )}

      <div className="mt-6 space-y-3">
        {products.map((product) =>
          editingId === product.id ? (
            <ProductForm key={product.id} categories={categories} initial={product} onDone={() => setEditingId(null)} />
          ) : (
            <div key={product.id} className="flex flex-wrap items-center justify-between gap-3 rounded-hola-lg bg-white p-4 shadow-sm">
              <div>
                <p className="font-display text-hola-brown">
                  {product.name} <span className="text-xs text-hola-brown-soft">({product.category.label})</span>
                </p>
                <p className="text-xs text-hola-brown-soft">
                  ₱{product.basePrice} {product.tag && `· ${product.tag}`} {!product.isAvailable && "· Unavailable"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    startTransition(() => {
                      void toggleProductAvailability(product.id, !product.isAvailable);
                    })
                  }
                  className="rounded-full border border-hola-brown/15 px-3 py-1.5 text-xs text-hola-brown hover:bg-hola-beige"
                >
                  {product.isAvailable ? "Mark Sold Out" : "Mark Available"}
                </button>
                <button
                  onClick={() => setEditingId(product.id)}
                  className="rounded-full border border-hola-brown/15 px-3 py-1.5 text-xs text-hola-brown hover:bg-hola-beige"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    startTransition(() => {
                      void deleteProduct(product.id);
                    })
                  }
                  className="rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
