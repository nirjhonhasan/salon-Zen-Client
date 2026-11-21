import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Crown,
  Mail,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import type { SessionUser } from "@/app/Types"

type QuickLink = { title: string; href: string; icon: LucideIcon }

// Shortcuts shown at the bottom of the card, different for each role.
const adminLinks: QuickLink[] = [
  { title: "Manage Services", href: "/dashboard/admin/services", icon: Wrench },
  { title: "Manage Users", href: "/dashboard/admin/users", icon: Users },
]

const customerLinks: QuickLink[] = [
  { title: "Browse Services", href: "/services", icon: Scissors },
  { title: "My Dashboard", href: "/dashboard/customer", icon: CalendarDays },
]

function formatMemberSince(value: SessionUser["createdAt"]) {
  if (!value) return "-"

  return new Date(value).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  })
}

// The "business card" on the profile page: cover, big avatar, name,
// role badge, a few account details and role-based shortcuts.
export default function ProfileCard({ user }: { user: SessionUser }) {
  const isAdmin = user.role === "admin"
  const links = isAdmin ? adminLinks : customerLinks

  const details = [
    { label: "Role", value: isAdmin ? "Administrator" : "Customer" },
    { label: "Status", value: user.isBlocked ? "Blocked" : "Active" },
    { label: "Member since", value: formatMemberSince(user.createdAt) },
  ]

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-zinc-900 shadow-2xl shadow-black/30">
      {/* Cover: gold gradient with soft glows */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-amber-500/50 via-amber-700/25 to-zinc-900">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-amber-400/20 blur-2xl" />
        <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-amber-300/10 blur-2xl" />
        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-zinc-950/60 px-3 py-1 text-[11px] font-semibold tracking-wider text-amber-400 uppercase backdrop-blur">
          {isAdmin ? (
            <Crown className="h-3.5 w-3.5" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
          {isAdmin ? "Admin" : "Member"}
        </span>
      </div>

      <div className="px-6 pb-6 text-center">
        {/* Avatar overlaps the cover, with a gold ring and a status dot */}
        <div className="relative mx-auto -mt-16 h-32 w-32">
          <div className="h-full w-full overflow-hidden rounded-full border-4 border-zinc-900 bg-zinc-800 ring-2 ring-amber-500 ring-offset-4 ring-offset-zinc-900">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-[family-name:var(--font-heading)] text-5xl font-semibold text-amber-500">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>
          <span
            title={user.isBlocked ? "Blocked" : "Active"}
            className={`absolute right-2 bottom-2 h-5 w-5 rounded-full border-4 border-zinc-900 ${
              user.isBlocked ? "bg-red-500" : "bg-emerald-500"
            }`}
          />
        </div>

        <h2 className="mt-5 font-[family-name:var(--font-heading)] text-3xl font-semibold text-white">
          {user.name}
        </h2>

        <p className="mt-1 flex items-center justify-center gap-2 text-sm text-zinc-400">
          <Mail className="h-4 w-4 shrink-0 text-amber-500" />
          <span className="truncate">{user.email}</span>
        </p>

        <p className="mt-1 flex items-center justify-center gap-2 text-sm text-zinc-400">
          <Phone className="h-4 w-4 shrink-0 text-amber-500" />
          <span className="truncate">{user.phone || "No phone added"}</span>
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-500">
          <ShieldCheck className="h-3.5 w-3.5" />
          {isAdmin ? "Salon administrator" : "Valued customer"}
        </span>

        {/* Account details */}
        <dl className="mt-6 grid grid-cols-3 divide-x divide-zinc-800 rounded-2xl border border-zinc-800 bg-zinc-950/60 py-3">
          {details.map((item) => (
            <div key={item.label} className="px-2">
              <dt className="text-[10px] tracking-wider text-zinc-500 uppercase">
                {item.label}
              </dt>
              <dd
                className={`mt-1 text-sm font-semibold ${
                  item.value === "Blocked" ? "text-red-400" : "text-zinc-100"
                }`}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Role-based shortcuts */}
        <div className="mt-5 space-y-2">
          {links.map(({ title, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 transition hover:border-amber-500/60 hover:text-amber-500"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-amber-500" />
                {title}
              </span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
