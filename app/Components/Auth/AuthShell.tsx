import type { ReactNode } from "react"
import Image from "next/image"
import { CalendarCheck, ShieldCheck, Sparkles } from "lucide-react"

const perks = [
  { icon: Sparkles, text: "Browse hair, skin, nails and spa services" },
  { icon: CalendarCheck, text: "Book your favourite time slot in seconds" },
  {
    icon: ShieldCheck,
    text: "Secure payments after your booking is confirmed",
  },
]

// Shared look for the sign-in and sign-up pages:
// salon photo behind, a short pitch on the left, the form card on the right.
export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-zinc-950">
      <Image
        src="/banner_bg.webp"
        alt=""
        fill
        sizes="100vw"
        priority
        className="-z-20 object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-950 via-zinc-950/80 to-amber-950/40" />
      <div className="absolute -top-24 -left-24 -z-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -right-24 -bottom-24 -z-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Pitch (hidden on small screens) */}
        <div className="hidden lg:block">
          <p className="text-xs font-semibold tracking-[0.3em] text-amber-500 uppercase">
            Welcome to SalonBook
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-5xl leading-tight font-semibold text-white">
            Look good.
            <br />
            <span className="text-amber-500">Feel even better.</span>
          </h2>
          <p className="mt-5 max-w-md text-zinc-400">
            Your salon appointments, all in one place. Pick a service, choose a
            time and we will take care of the rest.
          </p>
          <ul className="mt-8 space-y-4">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-zinc-300">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500">
                  <Icon className="h-5 w-5" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Form card */}
        <div className="w-full max-w-md justify-self-center lg:justify-self-end">
          <div className="rounded-2xl border border-amber-500/20 bg-zinc-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="font-[family-name:var(--font-heading)] text-4xl font-semibold text-white">
                {title}
              </h1>
              <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
            </div>

            {children}

            <p className="mt-6 text-center text-sm text-zinc-400">{footer}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
