import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CreditCard,
  Scissors,
  Users,
  Wrench,
} from "lucide-react"
import StatCard from "@/app/Components/dashboard/StatCard"
import { getAdminStats } from "@/lib/admin-stats"
import { requireRole } from "@/lib/session"

// Always show fresh numbers, not a saved copy.
export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  // Only a logged-in admin can open this page.
  const user = await requireRole("admin")

  const stats = await getAdminStats()

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
          Admin Overview
        </p>
        <h1 className="mt-1 text-3xl font-bold text-white">
          Welcome back, {user.name}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Here is a quick look at your salon.
        </p>
      </div>

      {/* The 6 numbers from the assignment */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Registered Customers"
          value={stats.customers}
          icon={Users}
        />
        <StatCard
          title="Active Services"
          value={stats.activeServices}
          icon={Scissors}
        />
        <StatCard
          title="Appointment Requests"
          value={stats.appointments}
          icon={CalendarDays}
        />
        <StatCard
          title="Pending Appointments"
          value={stats.pending}
          icon={CalendarClock}
        />
        <StatCard
          title="Confirmed Appointments"
          value={stats.confirmed}
          icon={CalendarCheck}
        />
        <StatCard
          title="Successful Payments"
          value={stats.payments}
          icon={CreditCard}
        />
      </div>

      {/* Shortcuts to pages that exist */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/admin/services"
          className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-amber-500/60"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-zinc-200">
            <Wrench className="h-4 w-4 text-amber-500" />
            Manage services
          </span>
          <ArrowRight className="h-4 w-4 text-amber-500" />
        </Link>

        <Link
          href="/services"
          className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-amber-500/60"
        >
          <span className="text-sm font-medium text-zinc-200">
            See what customers see
          </span>
          <ArrowRight className="h-4 w-4 text-amber-500" />
        </Link>
      </div>
    </div>
  )
}
