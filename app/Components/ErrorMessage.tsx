"use client"

import { useEffect } from "react"
import { RotateCw, TriangleAlert } from "lucide-react"

// One friendly error box. Used by every error.tsx file.
// "retry" tries to load the page again.
export default function ErrorMessage({ error, retry, }: {
  error: unknown
  retry: () => void
}) {

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
          <TriangleAlert className="h-7 w-7 text-red-400" />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-white">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          We could not load this page. Please try again in a moment.
        </p>

        <button
          onClick={() => retry()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
        >
          <RotateCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  )
}
