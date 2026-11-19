import type { LucideIcon } from "lucide-react"

// One statistics card: an icon, a number and a label.
// Reused for every number on the dashboards.
export default function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: number
  icon: LucideIcon
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <Icon className="h-6 w-6 text-amber-500" />
      <p className="mt-4 text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-zinc-400">{title}</p>
    </div>
  )
}
