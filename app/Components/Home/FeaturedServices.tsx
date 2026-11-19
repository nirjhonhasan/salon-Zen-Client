import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ServiceCard from "@/app/Components/Services/ServiceCard"
import { getActiveServices, type Service } from "@/lib/services"

// Home page section: shows the 6 newest active services from the database.
export default async function FeaturedServices() {
  let services: Service[] = []
  let failed = false

  try {
    services = await getActiveServices(6)
  } catch {
    failed = true
  }

  return (
    <section className="border-t border-zinc-900 bg-zinc-950 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-medium text-amber-500 sm:text-4xl">
            Featured Services
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
            Our most popular treatments, ready to book online.
          </p>
        </div>

        {failed && (
          <p className="text-center text-sm text-red-400">
            Could not load services right now. Please try again later.
          </p>
        )}

        {!failed && services.length === 0 && (
          <p className="text-center text-sm text-zinc-400">
            No services available yet. Please check back soon.
          </p>
        )}

        {services.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-amber-500 hover:text-amber-500"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
