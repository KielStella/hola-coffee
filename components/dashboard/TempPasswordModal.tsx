"use client";

import { useState } from "react";
import { KeyRound, Copy, Check, X } from "lucide-react";

export default function TempPasswordModal({
  userName,
  password,
  onClose,
}: {
  userName: string;
  password: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — user can still select/copy manually.
    }
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-hola-brown/50 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Temporary password"
      onClick={onClose}
    >
      <div
        className="hola-shadow w-full max-w-sm rounded-hola-lg bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hola-blue/10">
            <KeyRound className="h-5 w-5 text-hola-blue-dark" />
          </div>
          <button onClick={onClose} aria-label="Close" className="text-hola-brown-soft hover:text-hola-brown">
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 className="mt-4 font-display text-lg text-hola-brown">Password Reset</h2>
        <p className="mt-1 text-sm text-hola-brown-soft">
          New temporary password for <span className="font-semibold text-hola-brown">{userName}</span>. Share it
          securely — it won&apos;t be shown again.
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 rounded-hola-sm bg-hola-beige px-4 py-3">
          <code className="font-mono text-sm text-hola-brown">{password}</code>
          <button
            onClick={handleCopy}
            aria-label="Copy password"
            className="shrink-0 rounded-full bg-white p-2 text-hola-brown-soft shadow-sm transition hover:text-hola-brown"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full rounded-full bg-hola-blue px-5 py-2.5 text-sm font-display text-white transition hover:bg-hola-blue-dark"
        >
          Done
        </button>
      </div>
    </div>
  );
}
