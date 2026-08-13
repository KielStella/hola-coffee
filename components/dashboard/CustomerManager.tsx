"use client";

import { useState, useTransition } from "react";
import { Search } from "lucide-react";
import { searchCustomers, deactivateCustomerAccount, resetCustomerPassword } from "@/actions/customers";
import TempPasswordModal from "./TempPasswordModal";

type Customer = {
  id: string;
  name: string | null;
  email: string | null;
  points: number;
  ordersCompleted: number;
  isActive: boolean;
};

export default function CustomerManager({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [resetFor, setResetFor] = useState<{ name: string; password: string } | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const results = await searchCustomers(query);
      setCustomers(results);
    });
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          className="w-full max-w-sm rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-3 py-2 text-sm text-hola-brown outline-none focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full bg-hola-blue px-4 py-2 text-sm font-display text-white hover:bg-hola-blue-dark disabled:opacity-60"
        >
          <Search className="h-4 w-4" /> Search
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {customers.map((c) => (
          <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-hola-lg bg-white p-4 shadow-sm">
            <div>
              <p className="font-display text-hola-brown">{c.name}</p>
              <p className="text-xs text-hola-brown-soft">
                {c.email} · {c.points} pts · {c.ordersCompleted} orders {!c.isActive && "· Deactivated"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  startTransition(async () => {
                    const { temporaryPassword } = await resetCustomerPassword(c.id);
                    setResetFor({ name: c.name ?? "this customer", password: temporaryPassword });
                  })
                }
                className="rounded-full border border-hola-brown/15 px-3 py-1.5 text-xs text-hola-brown hover:bg-hola-beige"
              >
                Reset Password
              </button>
              <button
                onClick={() =>
                  startTransition(async () => {
                    await deactivateCustomerAccount(c.id, !c.isActive);
                    setCustomers((prev) => prev.map((p) => (p.id === c.id ? { ...p, isActive: !p.isActive } : p)));
                  })
                }
                className="rounded-full border border-hola-brown/15 px-3 py-1.5 text-xs text-hola-brown hover:bg-hola-beige"
              >
                {c.isActive ? "Deactivate" : "Reactivate"}
              </button>
            </div>
          </div>
        ))}
        {customers.length === 0 && <p className="text-sm text-hola-brown-soft">No customers found.</p>}
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
