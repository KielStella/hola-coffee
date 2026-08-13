export function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.7h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.24C15.9 4.16 15 4.08 13.9 4.08c-2.4 0-4.05 1.46-4.05 4.15v2.15H7.25v3h2.6V21h3.65Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.65 3c.2 1.72 1.16 3.18 2.65 4.03a6.3 6.3 0 0 0 2.7.78v3.07a9.2 9.2 0 0 1-5.3-1.7v6.27a5.55 5.55 0 1 1-4.8-5.5v3.1a2.52 2.52 0 1 0 1.72 2.4V3h3.03Z" />
    </svg>
  );
}
