import Link from "next/link"
import { Plus } from "lucide-react"
import { requireRole } from "@/lib/session"
import { getAllServices } from "@/lib/services"

// Always show the newest data from the database.
export const dynamic = "force-dynamic"

export default async function ManageServicesPage() {
  // Only a logged-in admin can open this page.
  await requireRole("admin")

  const services = await getAllServices()

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Heading + Add button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
            Admin / Services
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Manage Services
          </h1>
        </div>

        <Link
          href="/dashboard/admin/services/new"
          className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Add New Service
        </Link>
      </div>

      {/* Services table */}
      {services.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-sm text-zinc-400">
          No services yet. Click &quot;Add New Service&quot; to create the
          first one.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-800 text-xs uppercase text-zinc-400">
              <tr>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-zinc-800 last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.serviceName}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-white">
                        {service.serviceName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    {service.category}
                  </td>
                  <td className="px-4 py-3 text-amber-500">${service.price}</td>
                  <td className="px-4 py-3 text-zinc-300">
                    {service.duration} min
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        service.status === "active"
                          ? "rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400"
                          : "rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400"
                      }
                    >
                      {service.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
