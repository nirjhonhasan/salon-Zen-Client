import Link from "next/link"
import { Search } from "lucide-react"
import EmptyServices from "@/app/Components/Services/EmptyServices"
import ServiceCard from "@/app/Components/Services/ServiceCard"
import { categories } from "@/lib/categories"
import { getActiveServices, type Service } from "@/lib/services"

// Always read fresh data from the database (not a cached build).
export const dynamic = "force-dynamic"

const inputClass =
  "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"

// The search, category and sort values come from the URL, for example:
// /services?search=hair&category=Makeup&sort=price-asc
export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; sort?: string }>
}) {
  const { search = "", category = "", sort = "" } = await searchParams

  let services: Service[] = []
  let loadError = false

  try {
    services = await getActiveServices({ search, category, sort })
  } catch (error) {
    // A database problem should not crash the whole page.
    console.error("Could not load services:", error)
    loadError = true
  }

  const hasFilters = Boolean(search || category || sort)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page heading */}
      <header className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
          Our services
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white">
          Find your next treatment
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Professional care for your hair, skin and nails.
        </p>
      </header>

      {/* A normal HTML form. Pressing the button reloads the page with the
          chosen values in the URL, and the server filters the services. */}
      <form
        action="/services"
        className="mt-8 grid gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:grid-cols-4"
      >
        <input
          name="search"
          defaultValue={search}
          placeholder="Search by service name"
          className={inputClass}
        />

        <select name="category" defaultValue={category} className={inputClass}>
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select name="sort" defaultValue={sort} className={inputClass}>
          <option value="">Newest first</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
          >
            <Search className="h-4 w-4" />
            Apply
          </button>

          {hasFilters && (
            <Link
              href="/services"
              className="flex items-center rounded-xl border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-amber-500 hover:text-amber-500"
            >
              Reset
            </Link>
          )}
        </div>
      </form>

      {/* Empty state OR grid */}
      {services.length === 0 ? (
        <EmptyServices
          title={
            loadError
              ? "Services are unavailable"
              : hasFilters
                ? "No matching services"
                : "No services yet"
          }
          description={
            loadError
              ? "We could not reach the database right now. Please refresh the page in a moment."
              : hasFilters
                ? "Try a different name or category, or reset the filters."
                : "Our team is preparing the treatment list. Please check back soon."
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
