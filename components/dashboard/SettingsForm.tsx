"use client";

import { useState, useTransition } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { updateSettings, type SettingsInput } from "@/actions/settings";

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-3 py-2 text-sm text-hola-brown outline-none focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";
const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wide text-hola-brown-soft";

export default function SettingsForm({ initial }: { initial: SettingsInput }) {
  const [form, setForm] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  function field<K extends keyof SettingsInput>(key: K) {
    return {
      value: (form[key] as string | number | undefined) ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-hola-lg bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg text-hola-brown">Business Info</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Site Name</label>
            <input className={inputClass} {...field("siteName")} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input className={inputClass} {...field("phone")} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Address</label>
            <input className={inputClass} {...field("address")} />
          </div>
          <div>
            <label className={labelClass}>Business Email</label>
            <input className={inputClass} {...field("email")} />
          </div>
          <div>
            <label className={labelClass}>Google Maps URL</label>
            <input className={inputClass} {...field("mapsUrl")} />
          </div>
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input className={inputClass} {...field("facebookUrl")} />
          </div>
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input className={inputClass} {...field("instagramUrl")} />
          </div>
          <div>
            <label className={labelClass}>Weekday Hours</label>
            <input className={inputClass} {...field("hoursWeekday")} />
          </div>
          <div>
            <label className={labelClass}>Weekend Hours</label>
            <input className={inputClass} {...field("hoursWeekend")} />
          </div>
        </div>
      </div>

      <div className="rounded-hola-lg bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg text-hola-brown">Loyalty Program</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Points Per Order</label>
            <input
              type="number"
              className={inputClass}
              value={form.pointsPerOrder ?? 0}
              onChange={(e) => setForm((f) => ({ ...f, pointsPerOrder: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className={labelClass}>Birthday Bonus</label>
            <input
              type="number"
              className={inputClass}
              value={form.birthdayBonusPoints ?? 0}
              onChange={(e) => setForm((f) => ({ ...f, birthdayBonusPoints: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className={labelClass}>Points Multiplier</label>
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={form.pointsMultiplier ?? 1}
              onChange={(e) => setForm((f) => ({ ...f, pointsMultiplier: Number(e.target.value) }))}
            />
          </div>
        </div>
      </div>

      <div className="rounded-hola-lg bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg text-hola-brown">SEO</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className={labelClass}>SEO Title</label>
            <input className={inputClass} {...field("seoTitle")} />
          </div>
          <div>
            <label className={labelClass}>SEO Description</label>
            <input className={inputClass} {...field("seoDescription")} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full bg-hola-blue px-6 py-3 font-display text-white transition hover:bg-hola-blue-dark disabled:opacity-60"
      >
        {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {isPending ? "Saving…" : saved ? "Saved!" : "Save Settings"}
      </button>
    </form>
  );
}
