import Link from "next/link"
import { CheckCircle2, Home, LayoutDashboard } from "lucide-react"
import { requireUser } from "@/lib/session"

// Stripe sends the customer here after a successful payment:
// /booking-success?session_id=cs_test_123
// This page only shows a message. It does NOT mark anything as paid.
// Only the Stripe webhook on the server is allowed to do that.
export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  await requireUser()
  const { session_id } = await searchParams

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-16">
      {/* Soft golden glow behind the card */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-9 w-9 text-emerald-400" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Payment successful
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Thank you! We received your payment. Your appointment will be marked
          as paid in a few moments. We look forward to seeing you at the salon.
        </p>

        {/* Payment reference from Stripe (only shown when it is in the URL) */}
        {session_id && (
          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950 p-3">
            <p className="text-xs text-zinc-500">Payment reference</p>
            <p className="mt-1 text-xs break-all text-zinc-300">{session_id}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/customer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
          >
            <LayoutDashboard className="h-4 w-4" />
            Go to dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-amber-500 hover:text-amber-500"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
