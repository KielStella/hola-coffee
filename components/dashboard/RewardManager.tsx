"use client";

import { useState, useTransition } from "react";
import { Plus, X } from "lucide-react";
import { createReward, updateReward, deleteReward } from "@/actions/rewards";

type Reward = {
  id: string;
  name: string;
  description: string;
  points: number;
  category: string;
  isAvailable: boolean;
};

const CATEGORIES = ["COFFEE", "NON_COFFEE", "PASTRIES", "DESSERTS", "MERCHANDISE", "LIMITED_EDITION"] as const;

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-3 py-2 text-sm text-hola-brown outline-none focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

function RewardForm({ initial, onDone }: { initial?: Reward; onDone: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    points: initial?.points ?? 150,
    category: (initial?.category as (typeof CATEGORIES)[number]) ?? CATEGORIES[0],
    isAvailable: initial?.isAvailable ?? true,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      if (initial) {
        await updateReward(initial.id, { ...form, points: Number(form.points) });
      } else {
        await createReward({ ...form, points: Number(form.points) });
      }
      onDone();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-hola-lg bg-white p-5 shadow-md">
      <input
        required
        placeholder="Reward Name"
        className={inputClass}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        required
        placeholder="Description"
        rows={2}
        className={inputClass}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          required
          type="number"
          placeholder="Points Required"
          className={inputClass}
          value={form.points}
          onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
        />
        <select
          className={inputClass}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as (typeof CATEGORIES)[number] })}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.replace("_", " ")}
            </option>
          ))}
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
          {isPending ? "Saving…" : initial ? "Save Changes" : "Create Reward"}
        </button>
        <button type="button" onClick={onDone} className="rounded-full border border-hola-brown/15 px-5 py-2 text-sm text-hola-brown">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function RewardManager({ rewards }: { rewards: Reward[] }) {
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-hola-brown-soft">{rewards.length} rewards</p>
        <button
          onClick={() => setCreating((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-hola-blue px-4 py-2 text-sm font-display text-white hover:bg-hola-blue-dark"
        >
          {creating ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {creating ? "Close" : "New Reward"}
        </button>
      </div>

      {creating && (
        <div className="mt-4">
          <RewardForm onDone={() => setCreating(false)} />
        </div>
      )}

      <div className="mt-6 space-y-3">
        {rewards.map((reward) =>
          editingId === reward.id ? (
            <RewardForm key={reward.id} initial={reward} onDone={() => setEditingId(null)} />
          ) : (
            <div key={reward.id} className="flex flex-wrap items-center justify-between gap-3 rounded-hola-lg bg-white p-4 shadow-sm">
              <div>
                <p className="font-display text-hola-brown">{reward.name}</p>
                <p className="text-xs text-hola-brown-soft">
                  {reward.points} pts · {reward.category.replace("_", " ")} {!reward.isAvailable && "· Disabled"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(reward.id)}
                  className="rounded-full border border-hola-brown/15 px-3 py-1.5 text-xs text-hola-brown hover:bg-hola-beige"
                >
                  Edit
                </button>
                <button
                  onClick={() => startTransition(() => deleteReward(reward.id))}
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
