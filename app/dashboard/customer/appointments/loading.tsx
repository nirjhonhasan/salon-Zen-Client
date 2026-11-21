import { Skeleton } from "@/components/ui/skeleton"

// Shown while the appointments are loading.
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-64" />
      </div>
      {[1, 2, 3].map((item) => (
        <Skeleton key={item} className="h-28 w-full rounded-2xl" />
      ))}
    </div>
  )
}
