export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-hola-sm bg-gradient-to-r from-hola-beige via-white to-hola-beige bg-[length:200%_100%] ${className}`}
      style={{ animation: "hola-shimmer 1.6s ease-in-out infinite" }}
      aria-hidden="true"
    />
  );
}
