import Link from "next/link"
import { ArrowLeft, Clock, Scissors } from "lucide-react"
import { requireUser } from "@/lib/session"
import { getServiceById, type ServiceWithStatus } from "@/lib/services"

// This page is private: logged-out visitors go to /sign-in.
// The id in the URL (/services/123) comes from params.
export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireUser()
  const { id } = await params

  let service: ServiceWithStatus | null = null
  let loadError = false

  try {
    service = await getServiceById(id)
  } catch (error) {
    console.error("Could not load service:", error)
    loadError = true
  }

  // Friendly message for a bad id or a server problem.
  if (!service) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-white">
          {loadError ? "Something went wrong" : "Service not found"}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {loadError
            ? "We could not load this service. Please try again in a moment."
            : "This service does not exist or the link is not correct."}
        </p>
        <Link
          href="/services"
          className="mt-6 inline-block rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
        >
          Browse services
        </Link>
      </div>
    )
  }

  const isActive = service.status === "active"

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to services
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="h-72 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 md:h-96">
          {service.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={service.image}
              alt={service.serviceName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Scissors className="h-12 w-12 text-zinc-600" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-amber-500 uppercase">
            {service.category}
          </span>

          <h1 className="text-3xl font-bold text-white">
            {service.serviceName}
          </h1>

          <p className="text-sm leading-relaxed text-zinc-300">
            {service.description}
          </p>

          <div className="flex items-center justify-between border-y border-zinc-800 py-4">
            <span className="text-2xl font-bold text-amber-500">
              ${service.price}
            </span>
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              <Clock className="h-4 w-4" />
              {service.duration} minutes
            </span>
          </div>

          {/* Booking button */}
          {isActive ? (
            <Link
              href={`/services/${service.id}/book`}
              className="block rounded-full bg-amber-500 px-5 py-3 text-center font-semibold text-zinc-950 transition hover:bg-amber-600"
            >
              Book Now
            </Link>
          ) : (
            <p className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-red-400">
              This service is not available for booking right now.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
