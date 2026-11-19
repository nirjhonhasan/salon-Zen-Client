import Link from "next/link"
import {
  ArrowUpRight,
  Brush,
  Droplets,
  Flower2,
  Hand,
  Palette,
  Scissors,
  Sparkles,
} from "lucide-react"

// Each category has an icon and a short line. The names match lib/categories.ts.
// Edit this list to change the menu.
const items = [
  {
    name: "Haircut & Styling",
    text: "Precision cuts and styles",
    icon: Scissors,
  },
  { name: "Hair Coloring", text: "Rich, lasting colour", icon: Palette },
  {
    name: "Hair Treatment",
    text: "Repair, shine and strength",
    icon: Droplets,
  },
  { name: "Facial & Skincare", text: "Glow from within", icon: Sparkles },
  { name: "Makeup", text: "Looks for every occasion", icon: Brush },
  { name: "Manicure & Pedicure", text: "Polished hands and feet", icon: Hand },
  { name: "Spa & Massage", text: "Relax, unwind, renew", icon: Flower2 },
]

// Styled like the menu in a luxury spa: a list of treatments, not boxes.
export default function Categories() {
  return (
    <section className="border-t border-zinc-900 bg-zinc-950 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8">
        {/* Left side: heading and button */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <p className="text-xs font-semibold tracking-[0.3em] text-amber-500 uppercase">
                The Menu
              </p>
            </div>

            <h2 className="mt-5 font-[family-name:var(--font-heading)] text-5xl leading-tight font-semibold text-white sm:text-6xl">
              Choose Your{" "}
              <span className="text-amber-500 italic">Treatment</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Seven collections, one promise: care that makes you feel your
              best. Pick a category to see every service inside it.
            </p>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-500/50 px-6 py-3 text-sm font-semibold text-amber-500 transition hover:bg-amber-500 hover:text-zinc-950"
            >
              View all services
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right side: the menu list */}
        <ul className="lg:col-span-3">
          {items.map((item, index) => (
            <li
              key={item.name}
              className="border-b border-zinc-800 first:border-t"
            >
              <Link
                // encodeURIComponent makes "Hair & Skin" safe to use in a URL.
                href={`/services?category=${encodeURIComponent(item.name)}`}
                className="group flex items-center gap-4 py-6 transition-all hover:pl-4 sm:gap-6"
              >
                {/* Number: 01, 02, 03 ... */}
                <span className="w-8 font-[family-name:var(--font-heading)] text-xl text-zinc-600 transition group-hover:text-amber-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Name and tagline */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-zinc-100 transition group-hover:text-amber-500 sm:text-4xl">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{item.text}</p>
                </div>

                {/* Icon turns into an arrow on hover */}
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-zinc-950">
                  <item.icon className="h-5 w-5 group-hover:hidden" />
                  <ArrowUpRight className="hidden h-5 w-5 group-hover:block" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
