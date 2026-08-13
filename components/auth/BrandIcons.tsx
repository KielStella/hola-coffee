export function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6 29.6 4 24 4c-7.5 0-14 4.2-17.7 10.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.5-5.5C29.6 35.2 26.9 36 24 36c-5.3 0-9.6-3.4-11.3-8l-6.6 5.1C9.9 39.7 16.4 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.5l6.5 5.5C41.4 35.6 44 30.2 44 24c0-1.2-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}

export function FacebookLogoIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#1877F2"
        d="M44 24c0-11-9-20-20-20S4 13 4 24c0 9.9 7.3 18.1 16.8 19.8V30h-5V24h5v-4.6c0-5 3-7.7 7.5-7.7 2.2 0 4.4.4 4.4.4v4.8h-2.5c-2.5 0-3.2 1.5-3.2 3.1V24h5.4l-.9 6h-4.5v13.8C36.7 42.1 44 33.9 44 24Z"
      />
    </svg>
  );
}
