import Link from "next/link"
import { ArrowLeft, Clock, Mail, Scissors, User } from "lucide-react"
import BookingForm from "@/app/Components/Services/BookingForm"
import { requireUser } from "@/lib/session"
import { getServiceById, type ServiceWithStatus } from "@/lib/services"

// A small message page, used for every "you cannot book" case.
function Message({
  title,
  text,
  href,
  linkText,
}: {
  title: string
  text: string
  href: string
  linkText: string
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="mt-2 text-sm text-zinc-400">{text}</p>
      <Link
        href={href}
        className="mt-6 inline-block rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
      >
        {linkText}
      </Link>
    </div>
  )
}

// Booking page: /services/123/book
// Service info comes from the id in the URL, user info from the session.
export default async function BookingPage({ params, }: {
  params: Promise<{ id: string }> }) {
  // 1. Who is logged in? (logged-out visitors are sent to /sign-in)
  const user = await requireUser()

  // 2. Which service? The id comes from the URL.
  const { id } = await params

  let service: ServiceWithStatus | null = null
  let loadError = false

  try {
    service = await getServiceById(id)
  } catch (error) {
    console.error("Could not load service:", error)
    loadError = true
  }

  // 3. Check every case where booking is not allowed.
  if (loadError) {
    return (
      <Message
        title="Something went wrong"
        text="We could not load this service. Please try again in a moment."
        href="/services"
        linkText="Browse services"
      />
    )
  }

  if (!service) {
    return (
      <Message
        title="Service not found"
        text="This service does not exist or the link is not correct."
        href="/services"
        linkText="Browse services"
      />
    )
  }

  if (user.role === "admin") {
    return (
      <Message
        title="Admins cannot book"
        text="Admin accounts can manage services, but they cannot book appointments."
        href={`/services/${service.id}`}
        linkText="Back to service"
      />
    )
  }

  if (service.status !== "active") {
    return (
      <Message
        title="Not available"
        text="This service is not available for booking right now."
        href="/services"
        linkText="Browse services"
      />
    )
  }

  // 4. Everything is fine: show the booking page.
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href={`/services/${service.id}`}
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to service details
      </Link>

      <div className="mt-4 mb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
          Book appointment
        </p>
        <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
          You are almost there
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left: service summary and customer info */}
        <aside className="space-y-4 lg:col-span-2">
          {/* Service card */}
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <div className="h-48 bg-zinc-950">
              {service.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={service.image}
                  alt={service.serviceName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Scissors className="h-10 w-10 text-zinc-600" />
                </div>
              )}
            </div>
            <div className="space-y-3 p-5">
              <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-amber-500 uppercase">
                {service.category}
              </span>
              <h2 className="text-xl font-bold text-white">
                {service.serviceName}
              </h2>
              <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                <span className="flex items-center gap-2 text-sm text-zinc-400">
                  <Clock className="h-4 w-4" />
                  {service.duration} minutes
                </span>
                <span className="text-xl font-bold text-amber-500">
                  ${service.price}
                </span>
              </div>
            </div>
          </div>

          {/* Customer card (from the session) */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
              Booking for
            </p>
            <div className="mt-3 flex items-center gap-3">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                  <User className="h-6 w-6" />
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{user.name}</p>
                <p className="flex items-center gap-1.5 truncate text-sm text-zinc-400">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: the booking form */}
        <div className="lg:col-span-3">
          <BookingForm serviceId={service.id} price={service.price} />
        </div>
      </div>
    </div>
  )
}


