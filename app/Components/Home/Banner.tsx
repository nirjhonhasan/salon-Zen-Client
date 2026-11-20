import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  Headphones,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

// The four small highlights shown at the bottom of the banner.
const highlights = [
  { icon: CalendarCheck, title: "Easy Booking" },
  { icon: ShieldCheck, title: "Trusted & Secure" },
  { icon: Sparkles, title: "Premium Services" },
  { icon: Headphones, title: "24/7 Support" },
]

export default function Banner() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-zinc-950 pt-24 pb-12 text-zinc-100">
      {/* Background image with dark overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner_bg.webp"
          alt="SalonBook Luxury Experience"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
      </div>

      {/* Soft golden glows for a luxury feel */}
      <div className="pointer-events-none absolute -top-24 -left-24 z-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-64 w-64 rounded-full bg-amber-600/5 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-amber-400 shadow-lg shadow-amber-500/10 backdrop-blur md:text-sm">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Premium Salon Experience</span>
          </div>

          {/* Main heading */}
          <h1 className="font-serif text-5xl leading-[1.05] font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Look Beautiful,
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 bg-clip-text font-normal text-transparent italic">
              Feel Amazing
            </span>
          </h1>

          {/* Short description with a gold line */}
          <div className="flex gap-4">
            <span className="w-1 shrink-0 rounded-full bg-gradient-to-b from-amber-500 to-transparent" />
            <p className="max-w-xl text-base leading-relaxed font-light text-zinc-300 sm:text-lg">
              Book your favorite salon services easily with SalonBook. Hair,
              Skin, Beauty & More — all in one place.
            </p>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-8 py-4 text-sm font-bold text-zinc-950 shadow-xl shadow-amber-500/30 transition hover:scale-105 hover:shadow-amber-500/50"
            >
              Book an Appointment
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-600 bg-zinc-900/40 px-8 py-4 text-sm font-semibold text-zinc-100 backdrop-blur transition hover:border-amber-500 hover:text-amber-400"
            >
              Browse Services
            </Link>
          </div>

          {/* Feature highlights: one slim row */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-zinc-700/50 pt-5">
            {highlights.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="flex items-center gap-2 text-sm font-medium text-zinc-200"
              >
                <Icon className="h-4 w-4 text-amber-500" />
                {title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
