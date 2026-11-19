import { Mail, ShieldCheck } from "lucide-react"
import type { SessionUser } from "@/app/Types"

// The "business card" on the profile page: cover, big avatar, name and badges.
export default function ProfileCard({ user }: { user: SessionUser }) {
  const role = user.role || "customer"

  return (
    <div className="overflow-hidden rounded-3xl border border-amber-500/20 bg-zinc-900">
      {/* Gold cover */}
      <div className="h-28 bg-gradient-to-br from-amber-500/40 via-amber-600/20 to-zinc-900" />

      <div className="px-6 pb-8 text-center">
        {/* Avatar overlaps the cover */}
        <div className="relative mx-auto -mt-14 h-28 w-28 overflow-hidden rounded-full border-4 border-zinc-900 bg-zinc-800 ring-2 ring-amber-500">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-[family-name:var(--font-heading)] text-4xl font-semibold text-amber-500">
              {user.name.slice(0, 1).toUpperCase()}
            </span>
          )}
        </div>

        <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-semibold text-white">
          {user.name}
        </h2>

        <p className="mt-1 flex items-center justify-center gap-2 text-sm text-zinc-400">
          <Mail className="h-4 w-4 text-amber-500" />
          <span className="truncate">{user.email}</span>
        </p>

        {/* Role and account status */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 capitalize">
            <ShieldCheck className="h-3.5 w-3.5" />
            {role}
          </span>

          <span
            className={
              user.isBlocked
                ? "rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400"
                : "rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400"
            }
          >
            {user.isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
      </div>
    </div>
  )
}
