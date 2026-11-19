import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

// The reasons shown as cards. Edit this list to change the section.
const reasons = [
  {
    number: "01",
    title: "Expert Stylists",
    text: "Trained professionals for hair, skin, makeup and nails.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Effortless Booking",
    text: "Choose a service, date and time in a few clicks.",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Secure Payment",
    text: "Pay for confirmed appointments safely with Stripe.",
    icon: CreditCard,
  },
  {
    number: "04",
    title: "Pure Hygiene",
    text: "Sterilised tools and premium products for every guest.",
    icon: ShieldCheck,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="border-t border-zinc-900 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
        {/* Left side: heading and button */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-amber-500" />
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-500 uppercase">
              The SalonBook Promise
            </p>
          </div>

          <h2 className="mt-5 font-[family-name:var(--font-heading)] text-4xl leading-tight font-semibold text-white sm:text-5xl">
            Why Choose <span className="text-amber-500 italic">Us</span>
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
            We treat every visit as a small luxury. From the moment you book to
            the moment you leave, our focus is your comfort, your style and your
            confidence.
          </p>

          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
          >
            Explore Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Right side: 4 cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-amber-500/20 bg-zinc-900/70 p-7 transition hover:border-amber-500/60"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/40 text-amber-500">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-zinc-700">
                  {item.number}
                </span>
              </div>

              <h3 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
