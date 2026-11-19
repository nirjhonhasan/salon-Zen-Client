import { Skeleton } from "@/components/ui/skeleton"

// Shown automatically while the admin pages load their data.
export default function AdminLoading() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-16 w-72" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton key={item} className="h-32 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
