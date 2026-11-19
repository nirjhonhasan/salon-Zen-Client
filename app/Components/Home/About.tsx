import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

// Edit these lists to change the text on the section.
const highlights = [
  "Certified and experienced beauty specialists",
  "Premium, international-standard products",
  "Hygienic, relaxing and luxurious ambience",
  "Flexible online booking with zero waiting time",
]

const stats = [
  { value: "8+", label: "Years of Experience" },
  { value: "15k+", label: "Happy Clients" },
  { value: "25+", label: "Expert Stylists" },
]

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-zinc-900 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950 py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left side: text */}
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-amber-500" />
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-500 uppercase">
              About SalonBook
            </p>
          </div>

          <h2 className="mt-5 font-[family-name:var(--font-heading)] text-4xl leading-tight font-semibold text-white sm:text-5xl">
            Where Elegance Meets{" "}
            <span className="text-amber-500 italic">Modern Styling</span>
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
            At SalonBook we believe self-care is an art. From precision haircuts
            and rejuvenating facials to bridal makeovers, our sanctuary helps
            you unwind and step out with confidence. Every detail is tailored to
            your own style.
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-zinc-200 sm:text-base"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-500" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
          >
            Book Your Visit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Right side: framed card with numbers */}
        <div className="rounded-3xl border border-amber-500/20 p-3">
          <div className="rounded-2xl border border-amber-500/10 bg-zinc-900/70 p-8 sm:p-10">
            <p className="font-[family-name:var(--font-heading)] text-3xl leading-snug font-semibold text-white italic sm:text-4xl">
              &ldquo;Self-care is not a luxury. It is how you begin your best
              day.&rdquo;
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-zinc-800 pt-8">
              {stats.map((item) => (
                <div key={item.label}>
                  <p className="font-[family-name:var(--font-heading)] text-4xl font-semibold text-amber-500">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
