"use client";

import { useState, useTransition } from "react";
import { Plus, X } from "lucide-react";
import { createStaffAccount, deactivateStaffAccount, resetStaffPassword } from "@/actions/staff";
import TempPasswordModal from "./TempPasswordModal";

type Staff = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  position: string | null;
  isActive: boolean;
};

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-3 py-2 text-sm text-hola-brown outline-none focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

function StaffForm({ onDone }: { onDone: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await createStaffAccount(form);
      setTempPassword(result.temporaryPassword);
    });
  }

  if (tempPassword) {
    return (
      <div className="rounded-hola-lg bg-white p-5 shadow-md">
        <p className="text-sm text-hola-brown">
          Staff account created. Temporary password (share securely — it won&apos;t be shown again):
        </p>
        <p className="mt-2 rounded-hola-sm bg-hola-beige px-3 py-2 font-mono text-sm text-hola-brown">{tempPassword}</p>
        <button onClick={onDone} className="mt-3 rounded-full bg-hola-blue px-5 py-2 text-sm font-display text-white hover:bg-hola-blue-dark">
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-hola-lg bg-white p-5 shadow-md">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required placeholder="Full Name" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="email" placeholder="Email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Phone" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input required placeholder="Position (e.g. Barista)" className={inputClass} value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="rounded-full bg-hola-blue px-5 py-2 text-sm font-display text-white hover:bg-hola-blue-dark disabled:opacity-60">
          {isPending ? "Creating…" : "Create Staff Account"}
        </button>
        <button type="button" onClick={onDone} className="rounded-full border border-hola-brown/15 px-5 py-2 text-sm text-hola-brown">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function StaffManager({ staff }: { staff: Staff[] }) {
  const [creating, setCreating] = useState(false);
  const [, startTransition] = useTransition();
  const [resetFor, setResetFor] = useState<{ name: string; password: string } | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-hola-brown-soft">{staff.length} staff members</p>
        <button
          onClick={() => setCreating((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-hola-blue px-4 py-2 text-sm font-display text-white hover:bg-hola-blue-dark"
        >
          {creating ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {creating ? "Close" : "New Staff Account"}
        </button>
      </div>

      {creating && (
        <div className="mt-4">
          <StaffForm onDone={() => setCreating(false)} />
        </div>
      )}

      <div className="mt-6 space-y-3">
        {staff.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-hola-lg bg-white p-4 shadow-sm">
            <div>
              <p className="font-display text-hola-brown">
                {s.name} <span className="text-xs text-hola-brown-soft">({s.position})</span>
              </p>
              <p className="text-xs text-hola-brown-soft">
                {s.email} {!s.isActive && "· Deactivated"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  startTransition(async () => {
                    const { temporaryPassword } = await resetStaffPassword(s.id);
                    setResetFor({ name: s.name ?? "this staff member", password: temporaryPassword });
                  })
                }
                className="rounded-full border border-hola-brown/15 px-3 py-1.5 text-xs text-hola-brown hover:bg-hola-beige"
              >
                Reset Password
              </button>
              <button
                onClick={() => startTransition(() => deactivateStaffAccount(s.id, !s.isActive))}
                className="rounded-full border border-hola-brown/15 px-3 py-1.5 text-xs text-hola-brown hover:bg-hola-beige"
              >
                {s.isActive ? "Deactivate" : "Reactivate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {resetFor && (
        <TempPasswordModal
          userName={resetFor.name}
          password={resetFor.password}
          onClose={() => setResetFor(null)}
        />
      )}
    </div>
  );
}
