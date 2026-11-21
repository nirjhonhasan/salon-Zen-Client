import { Skeleton } from "@/components/ui/skeleton"

// Shown while a service (or its booking page) loads.
export default function ServiceDetailsLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Skeleton className="h-4 w-36" />

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Image */}
        <Skeleton className="h-72 rounded-2xl md:h-96" />

        {/* Details */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  )
}
