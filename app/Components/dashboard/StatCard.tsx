import type { LucideIcon } from "lucide-react"

// Colors a card can use. Full class names are written out so Tailwind sees them.
const colors = {
  amber: {
    icon: "bg-amber-500/10 text-amber-500",
    glow: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  green: {
    icon: "bg-emerald-500/10 text-emerald-400",
    glow: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  red: {
    icon: "bg-red-500/10 text-red-400",
    glow: "bg-red-500/10",
    border: "hover:border-red-500/40",
  },
}

// One statistics card: an icon, a number and a label.
// Reused for every number on the dashboards.
export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "amber",
}: {
  title: string
  value: number
  icon: LucideIcon
  color?: keyof typeof colors
}) {
  const style = colors[color]

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 ${style.border}`}
    >
      {/* Soft glow in the corner */}
      <div
        className={`absolute -top-8 -right-8 h-28 w-28 rounded-full blur-2xl ${style.glow}`}
      />

      <div className="relative">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.icon}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <p className="mt-4 text-4xl font-bold text-white">{value}</p>
        <p className="mt-1 text-sm text-zinc-400">{title}</p>
      </div>
    </div>
  )
}
