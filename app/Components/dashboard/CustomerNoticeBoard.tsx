import Link from "next/link"
import {
  CalendarPlus,
  CircleX,
  CreditCard,
  Eye,
  Pin,
  Search,
} from "lucide-react"

// The things a customer can do. Edit this list to change the board.
const notices = [
  {
    title: "Browse and search services",
    text: "Search by name, pick a category and sort by price.",
    icon: Search,
  },
  {
    title: "Book an appointment",
    text: "Open any service, choose a date and a time slot, and send your request.",
    icon: CalendarPlus,
  },
  {
    title: "Track your status",
    text: "See if your request is pending, confirmed or cancelled.",
    icon: Eye,
  },
  {
    title: "Cancel pending requests",
    text: "Changed your mind? You can cancel while the request is still pending.",
    icon: CircleX,
  },
  {
    title: "Pay once confirmed",
    text: "When the salon confirms, a Pay Now button appears. Pay safely with Stripe.",
    icon: CreditCard,
  },
]

// Shown on the profile page for customers only.
export default function CustomerNoticeBoard() {
  return (
    <section className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-zinc-900 to-zinc-900/60 p-6 sm:p-8">
      {/* Title */}
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-zinc-950">
          <Pin className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-white">
            Notice Board
          </h2>
          <p className="text-xs text-zinc-400">
            What you can do with SalonBook
          </p>
        </div>
      </div>

      {/* Notes */}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {notices.map((item, index) => (
          <li
            key={item.title}
            className="flex gap-4 rounded-2xl border border-dashed border-amber-500/30 bg-zinc-950/60 p-4"
          >
            <span className="font-[family-name:var(--font-heading)] text-3xl leading-none font-semibold text-amber-500/60">
              {index + 1}
            </span>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <item.icon className="h-4 w-4 text-amber-500" />
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <Link
        href="/services"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
      >
        Start browsing services
      </Link>
    </section>
  )
}
