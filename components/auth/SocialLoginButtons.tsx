"use client";

import { signIn } from "next-auth/react";
import { GoogleIcon, FacebookLogoIcon } from "./BrandIcons";

const providers = [
  { id: "google", label: "Continue with Google", Icon: GoogleIcon },
  { id: "facebook", label: "Continue with Facebook", Icon: FacebookLogoIcon },
] as const;

export default function SocialLoginButtons({ callbackUrl = "/account" }: { callbackUrl?: string }) {
  return (
    <div className="space-y-3">
      {providers.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => signIn(id, { callbackUrl })}
          className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-hola-brown/15 bg-white px-6 py-3 font-display text-sm text-hola-brown transition hover:border-hola-yellow"
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
