import Link from "next/link"
import {
  Brush,
  Droplets,
  Flower2,
  Hand,
  Palette,
  Scissors,
  Sparkles,
} from "lucide-react"

// Each category has an icon. The names match lib/categories.ts.
const items = [
  { name: "Haircut & Styling", icon: Scissors },
  { name: "Hair Coloring", icon: Palette },
  { name: "Hair Treatment", icon: Droplets },
  { name: "Facial & Skincare", icon: Sparkles },
  { name: "Makeup", icon: Brush },
  { name: "Manicure & Pedicure", icon: Hand },
  { name: "Spa & Massage", icon: Flower2 },
]

export default function Categories() {
  return (
    <section className="border-t border-zinc-900 bg-zinc-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-medium text-amber-500 sm:text-4xl">
            Service Categories
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
            Choose a category to see the treatments we offer.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.name}
              // encodeURIComponent makes "Hair & Skin" safe to use in a URL.
              href={`/services?category=${encodeURIComponent(item.name)}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center transition hover:border-amber-500/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <item.icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-medium text-zinc-200">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
