import EmptyServices from "@/app/Components/Services/EmptyServices"
import ServiceCard from "@/app/Components/Services/ServiceCard"
import { getActiveServices, type Service } from "@/lib/services"

// Always read fresh data from the database (not a cached build).
export const dynamic = "force-dynamic"

export default async function ServicesPage() {
  let services: Service[] = []
  let loadError = false

  try {
    services = await getActiveServices()
  } catch (error) {
    // A database problem should not crash the whole page.
    console.error("Could not load services:", error)
    loadError = true
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page heading */}
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
          Our services
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white">
          Find your next treatment
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Professional care for your hair, skin and nails. Every price already
          includes the full treatment time.
        </p>
      </header>

      {/* Empty state OR grid */}
      {services.length === 0 ? (
        <EmptyServices
          title={loadError ? "Services are unavailable" : "No services yet"}
          description={
            loadError
              ? "We could not reach the database right now. Please refresh the page in a moment."
              : "Our team is preparing the treatment list. New services are added regularly, so please check back soon."
          }
        />
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  )
}
