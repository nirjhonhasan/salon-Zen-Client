import Link from "next/link"
import { Clock, Scissors } from "lucide-react"
import type { Service } from "@/lib/services"

// One card in the services grid.
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-amber-500/60">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden bg-zinc-800">
        {service.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={service.image}
            alt={service.serviceName}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Scissors className="h-10 w-10 text-zinc-600" />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="space-y-3 p-5">
        <span className="inline-block rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-500">
          {service.category}
        </span>

        <h3 className="text-lg font-semibold text-white">
          {service.serviceName}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {service.description}
        </p>

        <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
          <span className="text-lg font-bold text-amber-500">
            ${service.price}
          </span>

          <span className="flex items-center gap-1.5 text-sm text-zinc-400">
            <Clock className="h-4 w-4" />
            {service.duration} min
          </span>
        </div>

        <Link
          href={`/services/${service.id}`}
          className="block rounded-full bg-amber-500 py-2 text-center text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}
