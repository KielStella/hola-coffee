import Skeleton from "@/components/Skeleton";

export default function DashboardLoading({ cards = 4 }: { cards?: number }) {
  return (
    <div>
      <Skeleton className="h-7 w-48" />
      <Skeleton className="mt-2 h-4 w-72" />
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="rounded-hola-lg bg-white p-4 shadow-sm">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="mt-3 h-6 w-12" />
            <Skeleton className="mt-2 h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="mt-8 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-hola-lg" />
        ))}
      </div>
    </div>
  );
}
