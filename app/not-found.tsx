import Link from "next/link"
import { Home, Scissors, SearchX } from "lucide-react"

// Shown for any URL that does not match a page.
export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4">
      {/* Soft amber glow behind the content */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
          <Scissors className="h-7 w-7 text-amber-500" />
        </div>

        <p className="mt-8 text-8xl font-bold leading-none tracking-tight text-amber-500 sm:text-9xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          This page got a little trim
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
          The page you are looking for was moved, removed, or never existed.
          Let us take you back to something beautiful.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>

          <Link
            href="/services"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-amber-500 hover:text-amber-500 sm:w-auto"
          >
            <SearchX className="h-4 w-4" />
            Browse services
          </Link>
        </div>
      </div>
    </div>
  )
}
