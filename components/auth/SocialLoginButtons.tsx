"use client";

import { signIn } from "next-auth/react";
import { GoogleIcon, FacebookLogoIcon } from "./BrandIcons";

const providers = [
  { id: "google", label: "Continue with Google", Icon: GoogleIcon, disabled: false },
  { id: "facebook", label: "Facebook — Coming Soon", Icon: FacebookLogoIcon, disabled: true },
] as const;

export default function SocialLoginButtons({ callbackUrl = "/account" }: { callbackUrl?: string }) {
  return (
    <div className="space-y-3">
      {providers.map(({ id, label, Icon, disabled }) => (
        <button
          key={id}
          type="button"
          disabled={disabled}
          onClick={disabled ? undefined : () => signIn(id, { callbackUrl })}
          aria-label={disabled ? "Facebook login coming soon" : label}
          className={
            disabled
              ? "flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-full border-2 border-gray-200 bg-gray-100 px-6 py-3 font-display text-sm text-gray-400"
              : "flex w-full items-center justify-center gap-3 rounded-full border-2 border-hola-brown/15 bg-white px-6 py-3 font-display text-sm text-hola-brown transition hover:border-hola-yellow"
          }
        >
          <Icon className={`h-5 w-5 shrink-0 ${disabled ? "grayscale opacity-40" : ""}`} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
