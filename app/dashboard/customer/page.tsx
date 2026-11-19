import Link from "next/link"
import { ArrowRight, Scissors, User } from "lucide-react"
import { requireRole } from "@/lib/session"

export default async function CustomerDashboardPage() {
  const user = await requireRole("customer")

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
          Customer
        </p>
        <h1 className="mt-1 text-3xl font-bold text-white">
          Welcome back, {user.name}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Browse our services and book your next appointment in a few clicks.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-lg font-semibold text-white">How booking works</h2>
        <ol className="mt-4 grid gap-4 text-sm text-zinc-400 sm:grid-cols-3">
          <li className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <span className="font-semibold text-amber-500">1.</span> Pick a
            service you like.
          </li>
          <li className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <span className="font-semibold text-amber-500">2.</span> Choose a
            date and a time slot.
          </li>
          <li className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <span className="font-semibold text-amber-500">3.</span> Pay online
            and wait for confirmation.
          </li>
        </ol>
      </div>
    </div>
  )
}
