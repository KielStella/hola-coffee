export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-hola-sm bg-linear-to-r from-hola-beige via-white to-hola-beige bg-size-[200%_100%] ${className}`}
      style={{ animation: "hola-shimmer 1.6s ease-in-out infinite" }}
      aria-hidden="true"
    />
  );
}
