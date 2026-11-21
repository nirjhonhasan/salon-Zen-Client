import { Skeleton } from "@/components/ui/skeleton"

// Shown while the users table loads.
export default function UsersLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-64" />
      </div>
      <Skeleton className="h-96 w-full rounded-2xl" />
    </div>
  )
}
