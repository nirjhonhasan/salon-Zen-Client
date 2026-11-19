import Link from "next/link"
import ServiceForm from "@/app/Components/dashboard/ServiceForm"
import { getServiceById } from "@/lib/services"
import { requireRole } from "@/lib/session"

// The id in the URL (/dashboard/admin/services/123/edit) comes from params.
export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Only a logged-in admin can open this page.
  await requireRole("admin")

  const { id } = await params

  // Load the service from the Express server.
  let service = null
  try {
    service = await getServiceById(id)
  } catch (error) {
    console.error("Could not load service:", error)
  }

  if (!service) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Service not found</h1>
        <p className="mt-2 text-sm text-zinc-400">
          This service does not exist or could not be loaded.
        </p>
        <Link
          href="/dashboard/admin/services"
          className="mt-6 inline-block rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
        >
          Back to services
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
          Admin / Services
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Edit Service
        </h1>
      </div>

      <ServiceForm service={service} />
    </div>
  )
}
