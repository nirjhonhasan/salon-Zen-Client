"use client"

import { useState } from "react"
import { CreditCard, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { callServer } from "@/lib/api"

// Starts a Stripe Checkout session for one appointment, then sends the
// customer to Stripe's payment page. The paid status is NOT set here:
// only the verified Stripe webhook on the server does that.
export default function PayNowButton({
  appointmentId,
}: {
  appointmentId: string
}) {
  const [loading, setLoading] = useState(false)

  async function handlePay() {
    setLoading(true)

    try {
      // The server checks the token, the owner, and "confirmed + unpaid".
      const data = await callServer(
        "/payments/create-checkout-session",
        "POST",
        {
          appointmentId,
        }
      )

      if (!data.url) {
        throw new Error("Could not start the payment.")
      }

      // Leave the site for Stripe Checkout. Keep the button disabled meanwhile.
      window.location.href = data.url
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not start the payment."
      )
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <CreditCard className="h-4 w-4" />
      )}
      {loading ? "Redirecting to Stripe..." : "Pay Now"}
    </button>
  )
}
