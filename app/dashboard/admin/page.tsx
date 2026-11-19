import Link from "next/link"
import { ArrowRight, CalendarDays, Scissors, User, Users } from "lucide-react"
import { requireRole } from "@/lib/session"

export default async function AdminDashboardPage() {
  const user = await requireRole("admin")

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
          Admin
        </p>
        <h1 className="mt-1 text-3xl font-bold text-white">
          Welcome back, {user.name}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          This is the admin area. Only accounts with the admin role can open
          it.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <Scissors className="h-6 w-6 text-amber-500" />
          <h2 className="mt-4 text-lg font-semibold text-white">Services</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Create and edit treatments, prices and pictures.
          </p>
          <span className="mt-4 inline-block rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
            Coming next
          </span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <CalendarDays className="h-6 w-6 text-amber-500" />
          <h2 className="mt-4 text-lg font-semibold text-white">Bookings</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Confirm or cancel appointments from every customer.
          </p>
          <span className="mt-4 inline-block rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
            Coming next
          </span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <Users className="h-6 w-6 text-amber-500" />
          <h2 className="mt-4 text-lg font-semibold text-white">Users</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Review accounts and block or unblock customers.
          </p>
          <span className="mt-4 inline-block rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
            Coming next
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/services"
          className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-amber-500/60"
        >
          <span className="text-sm font-medium text-zinc-200">
            See what customers see
          </span>
          <ArrowRight className="h-4 w-4 text-amber-500 transition group-hover:translate-x-1" />
        </Link>

        <Link
          href="/dashboard/profile"
          className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-amber-500/60"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-zinc-200">
            <User className="h-4 w-4 text-amber-500" />
            My profile
          </span>
          <ArrowRight className="h-4 w-4 text-amber-500 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
