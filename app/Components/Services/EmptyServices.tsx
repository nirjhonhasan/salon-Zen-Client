import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

// Shown instead of the grid when there are no services to display.
// The page passes the title/description so we can reuse it for
// "no services yet" and "could not load services".
export default function EmptyServices({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-16 text-center">
      {/* Soft amber glow in the background */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
          <Sparkles className="h-9 w-9 text-amber-500" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">{title}</h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
          >
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-amber-500 hover:text-amber-500"
          >
            My profile
          </Link>
        </div>
      </div>
    </div>
  )
}
