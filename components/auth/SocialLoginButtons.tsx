"use client";

import { signIn } from "next-auth/react";

const providers = [
  { id: "google", label: "Continue with Google" },
  { id: "facebook", label: "Continue with Facebook" },
  { id: "apple", label: "Continue with Apple" },
];

export default function SocialLoginButtons({ callbackUrl = "/account" }: { callbackUrl?: string }) {
  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          onClick={() => signIn(provider.id, { callbackUrl })}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-hola-brown/15 bg-white px-6 py-3 font-display text-sm text-hola-brown transition hover:border-hola-yellow"
        >
          {provider.label}
        </button>
      ))}
    </div>
  );
}
