"use client";

import { useTransition } from "react";
import Image from "next/image";
import { Check, Trash2 } from "lucide-react";
import { approveMoment, rejectMoment } from "@/actions/moments";

type Moment = {
  id: string;
  image: string;
  caption: string;
  category: string;
  isApproved: boolean;
  createdAt: Date;
  user: { name: string | null; email: string | null };
};

export default function MomentsManager({ moments }: { moments: Moment[] }) {
  const [isPending, startTransition] = useTransition();
  const pendingCount = moments.filter((moment) => !moment.isApproved).length;

  return (
    <div>
      <div className="mb-5 flex items-center gap-3 text-sm">
        <span className="rounded-full bg-hola-yellow-soft px-3 py-1 font-semibold text-hola-brown">{pendingCount} pending</span>
        <span className="text-hola-brown-soft">{moments.length} total submissions</span>
      </div>
      {moments.length === 0 ? (
        <div className="rounded-hola-lg bg-white p-10 text-center text-sm text-hola-brown-soft shadow-sm">No customer moments submitted yet.</div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {moments.map((moment) => (
            <article key={moment.id} className="overflow-hidden rounded-hola-md bg-white shadow-md">
              <div className="relative aspect-[4/3] bg-hola-beige">
                <Image src={moment.image} alt={moment.caption} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${moment.isApproved ? "bg-emerald-600 text-white" : "bg-hola-yellow text-hola-brown"}`}>
                  {moment.isApproved ? "Approved" : "Pending Review"}
                </span>
              </div>
              <div className="p-4">
                <p className="font-display text-hola-brown">{moment.category}</p>
                <p className="mt-1 text-sm leading-relaxed text-hola-brown-soft">{moment.caption}</p>
                <p className="mt-3 text-xs text-hola-brown-soft/75">By {moment.user.name || moment.user.email || "Customer"}</p>
                <div className="mt-4 flex gap-2">
                  {!moment.isApproved && (
                    <button disabled={isPending} onClick={() => startTransition(() => approveMoment(moment.id))} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">
                      <Check className="h-4 w-4" /> Approve
                    </button>
                  )}
                  <button disabled={isPending} onClick={() => startTransition(() => rejectMoment(moment.id))} className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50">
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
