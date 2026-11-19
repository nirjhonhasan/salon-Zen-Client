import { requireRole } from "@/lib/session"
import ServiceForm from "@/app/Components/dashboard/ServiceForm"

export default async function AddServicePage() {
  // Only a logged-in admin can open this page.
  await requireRole("admin")

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
          Admin / Services
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Add New Service
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Fill out the details below to publish a new salon treatment.
        </p>
      </div>

      <ServiceForm />
    </div>
  )
}
