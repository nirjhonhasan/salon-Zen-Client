import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarX,
  CreditCard,
  Scissors,
  User,
} from "lucide-react"
import StatCard from "@/app/Components/dashboard/StatCard"
import { getMyAppointments, type MyAppointment } from "@/lib/appointments"
import { requireRole } from "@/lib/session"

// Always show fresh numbers, not a saved copy.
export const dynamic = "force-dynamic"

export default async function CustomerDashboardPage() {
  const user = await requireRole("customer")

  // Load this customer's appointments from the server.
  let appointments: MyAppointment[] = []
  let loadError = false

  try {
    appointments = await getMyAppointments()
  } catch (error) {
    console.error("Could not load appointments:", error)
    loadError = true
  }

  // Count the appointments by status.
  const total = appointments.length
  const pending = appointments.filter((a) => a.status === "pending").length
  const confirmed = appointments.filter((a) => a.status === "confirmed").length
  const cancelled = appointments.filter((a) => a.status === "cancelled").length

  // Confirmed appointments that still need a payment.
  const waitingForPayment = appointments.filter(
    (a) => a.status === "confirmed" && a.paymentStatus === "unpaid"
  ).length

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-900 p-6 sm:p-8">
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
            Customer
          </p>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
            Welcome back, {user.name}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Here is a quick look at your appointments.
          </p>
          <Link
            href="/services"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
          >
            <Scissors className="h-4 w-4" />
            Book a new service
          </Link>
        </div>
      </div>

      {/* The 4 numbers from the assignment */}
      {loadError ? (
        <p className="rounded-2xl border border-dashed border-red-500/30 p-8 text-center text-sm text-red-400">
          We could not load your numbers. Please refresh the page.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Appointments"
            value={total}
            icon={CalendarDays}
          />
          <StatCard title="Pending" value={pending} icon={CalendarClock} />
          <StatCard
            title="Confirmed"
            value={confirmed}
            icon={CalendarCheck}
            color="green"
          />
          <StatCard
            title="Cancelled"
            value={cancelled}
            icon={CalendarX}
            color="red"
          />
        </div>
      )}

      {/* Reminder: only shown when a payment is waiting */}
      {waitingForPayment > 0 && (
        <Link
          href="/dashboard/customer/appointments"
          className="flex items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 transition hover:border-amber-500/60"
        >
          <span className="flex items-center gap-3 text-sm text-zinc-200">
            <CreditCard className="h-5 w-5 text-amber-500" />
            You have {waitingForPayment} confirmed appointment
            {waitingForPayment > 1 ? "s" : ""} waiting for payment.
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-amber-500">
            Pay now
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      )}

      {/* Shortcuts */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/customer/appointments"
          className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-amber-500/60"
        >
          <CalendarDays className="h-6 w-6 text-amber-500" />
          <h2 className="mt-4 text-lg font-semibold text-white">
            My Appointments
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            See every booking and its status.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-500">
            Open list
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          href="/services"
          className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-amber-500/60"
        >
          <Scissors className="h-6 w-6 text-amber-500" />
          <h2 className="mt-4 text-lg font-semibold text-white">
            Browse Services
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            See every treatment and its price.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-500">
            View services
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          href="/dashboard/profile"
          className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-amber-500/60"
        >
          <User className="h-6 w-6 text-amber-500" />
          <h2 className="mt-4 text-lg font-semibold text-white">My Profile</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Update your name and profile picture.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-500">
            Open profile
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
      </div>

      {/* How booking works (the real order: book, confirm, pay) */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-lg font-semibold text-white">How booking works</h2>
        <ol className="mt-4 grid gap-4 text-sm text-zinc-400 sm:grid-cols-3">
          <li className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <span className="font-semibold text-amber-500">1.</span> Pick a
            service, a date and a time slot.
          </li>
          <li className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <span className="font-semibold text-amber-500">2.</span> Wait for
            the salon to confirm your appointment.
          </li>
          <li className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <span className="font-semibold text-amber-500">3.</span> Pay online
            and enjoy your visit.
          </li>
        </ol>
      </div>
    </div>
  )
}
