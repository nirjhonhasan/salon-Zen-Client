"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"

// "Continue with Google". After Google finishes, the user lands on
// /dashboard, which sends them to the right dashboard for their role.
export default function GoogleButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })

    // On success the browser leaves the page, so we only get here on failure.
    if (error) {
      toast.error(error.message || "Google sign in failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-full border border-zinc-700 bg-zinc-800/60 text-sm font-medium text-zinc-100 transition hover:border-amber-500/60 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.86c2.26-2.08 3.59-5.15 3.59-8.8Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.86-3c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.11-6.72-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.29a12 12 0 0 0 0 10.74l3.99-3.09Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.63l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
          />
        </svg>
      )}
      {loading ? "Redirecting to Google..." : label}
    </button>
  )
}
