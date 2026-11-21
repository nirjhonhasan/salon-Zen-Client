import { Skeleton } from "@/components/ui/skeleton"

// Shown while the customer overview loads its numbers.
export default function CustomerLoading() {
  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <Skeleton className="h-44 w-full rounded-2xl" />

      {/* Four stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-36 rounded-2xl" />
        ))}
      </div>

      {/* Shortcuts */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-40 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
