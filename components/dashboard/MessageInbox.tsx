"use client";

import { useState, useTransition } from "react";
import { Mail, MailOpen, Archive, Trash2 } from "lucide-react";
import { markMessageRead, markMessageReplied, archiveMessage, deleteMessagePermanently } from "@/actions/messages";

type Message = {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
};

const statusStyles: Record<string, string> = {
  UNREAD: "bg-hola-yellow/30 text-hola-brown",
  READ: "bg-hola-blue/10 text-hola-blue-dark",
  REPLIED: "bg-emerald-100 text-emerald-700",
  ARCHIVED: "bg-gray-100 text-gray-500",
};

export default function MessageInbox({ messages, canDelete = false }: { messages: Message[]; canDelete?: boolean }) {
  const [items, setItems] = useState(messages);
  const [, startTransition] = useTransition();
  const [expanded, setExpanded] = useState<string | null>(null);

  function updateLocal(id: string, status: string) {
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  }

  return (
    <div className="space-y-3">
      {items.map((m) => (
        <div key={m.id} className="rounded-hola-lg bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-display text-hola-brown">{m.subject}</p>
              <p className="text-xs text-hola-brown-soft">
                {m.fullName} · {m.email} · {new Date(m.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[m.status]}`}>{m.status}</span>
          </div>

          <button
            onClick={() => setExpanded(expanded === m.id ? null : m.id)}
            className="mt-2 text-left text-sm text-hola-brown-soft hover:text-hola-brown"
          >
            {expanded === m.id ? m.message : `${m.message.slice(0, 100)}${m.message.length > 100 ? "…" : ""}`}
          </button>

          <div className="mt-3 flex flex-wrap gap-2">
            {m.status === "UNREAD" && (
              <button
                onClick={() =>
                  startTransition(async () => {
                    await markMessageRead(m.id);
                    updateLocal(m.id, "READ");
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-hola-brown/15 px-3 py-1.5 text-xs text-hola-brown hover:bg-hola-beige"
              >
                <MailOpen className="h-3.5 w-3.5" /> Mark Read
              </button>
            )}
            {m.status !== "REPLIED" && (
              <button
                onClick={() =>
                  startTransition(async () => {
                    await markMessageReplied(m.id);
                    updateLocal(m.id, "REPLIED");
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-hola-brown/15 px-3 py-1.5 text-xs text-hola-brown hover:bg-hola-beige"
              >
                <Mail className="h-3.5 w-3.5" /> Mark Replied
              </button>
            )}
            {m.status !== "ARCHIVED" && (
              <button
                onClick={() =>
                  startTransition(async () => {
                    await archiveMessage(m.id);
                    updateLocal(m.id, "ARCHIVED");
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-hola-brown/15 px-3 py-1.5 text-xs text-hola-brown hover:bg-hola-beige"
              >
                <Archive className="h-3.5 w-3.5" /> Archive
              </button>
            )}
            {canDelete && (
              <button
                onClick={() =>
                  startTransition(async () => {
                    await deleteMessagePermanently(m.id);
                    setItems((prev) => prev.filter((item) => item.id !== m.id));
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            )}
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-sm text-hola-brown-soft">No messages yet.</p>}
    </div>
  );
}
