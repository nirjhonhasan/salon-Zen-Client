import { Skeleton } from "@/components/ui/skeleton"

// Shown automatically while /services loads its data.
export default function ServicesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-80 max-w-full" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>

      {/* Search and filter box */}
      <Skeleton className="mt-8 h-20 w-full rounded-2xl" />

      {/* Service cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton key={item} className="h-80 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
