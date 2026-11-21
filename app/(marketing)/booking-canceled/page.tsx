import Link from "next/link"
import { LayoutDashboard, Scissors, XCircle } from "lucide-react"
import { requireUser } from "@/lib/session"

// Stripe sends the customer here when they leave the payment page
// without paying: /booking-canceled
// Nothing was charged, and the appointment stays unpaid.
export default async function BookingCanceledPage() {
  await requireUser()

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-16">
      {/* Soft red glow behind the card */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <XCircle className="h-9 w-9 text-red-400" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white">Payment canceled</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Your payment was not completed and you were not charged. Your
          appointment is still saved, so you can pay again whenever you are
          ready.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/customer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
          >
            <LayoutDashboard className="h-4 w-4" />
            Go to dashboard
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-amber-500 hover:text-amber-500"
          >
            <Scissors className="h-4 w-4" />
            Browse services
          </Link>
        </div>
      </div>
    </div>
  )
}
