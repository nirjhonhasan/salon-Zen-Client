import Link from "next/link"
import { CalendarDays, ChevronDown, Clock, Mail, Scissors } from "lucide-react"
import AppointmentActions from "@/app/Components/dashboard/AppointmentActions"
import { requireRole } from "@/lib/session"
import { getAllAppointments, type AdminAppointment } from "@/lib/appointments"

// Always show the newest data from the database.
export const dynamic = "force-dynamic"

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-500",
  confirmed: "bg-emerald-500/10 text-emerald-400",
  cancelled: "bg-red-500/10 text-red-400",
}

const paymentStyles: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-400",
  unpaid: "bg-zinc-800 text-zinc-300",
}

function formatDate(value: string | null) {
  if (!value) return "-"

  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function Badge({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${className}`}
    >
      {text}
    </span>
  )
}

export default async function AdminAppointmentsPage() {
  // Only a logged-in admin can open this page.
  await requireRole("admin")

  let appointments: AdminAppointment[] = []
  let loadError = false

  try {
    appointments = await getAllAppointments()
  } catch (error) {
    console.error("Could not load appointments:", error)
    loadError = true
  }

  const pendingCount = appointments.filter(
    (item) => item.status === "pending"
  ).length

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
          Admin / Appointments
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Manage Appointments
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          {pendingCount > 0
            ? `${pendingCount} appointment${pendingCount > 1 ? "s" : ""} waiting for your decision.`
            : "Confirm or reject appointment requests from customers."}
        </p>
      </div>

      {loadError ? (
        <p className="rounded-2xl border border-dashed border-red-500/30 p-10 text-center text-sm text-red-400">
          We could not load the appointments. Please refresh the page.
        </p>
      ) : appointments.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-sm text-zinc-400">
          No appointment requests yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-center gap-4">
                {item.serviceImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.serviceImage}
                    alt={item.serviceName}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-amber-500">
                    <Scissors className="h-6 w-6" />
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-semibold text-white">
                    {item.serviceName}
                  </h2>
                  <p className="mt-0.5 truncate text-sm text-zinc-300">
                    {item.customerName}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-amber-500" />
                      {formatDate(item.appointmentDate)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-amber-500" />
                      {item.timeSlot}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className="text-lg font-semibold text-amber-500">
                    ${item.servicePrice}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      text={item.status}
                      className={statusStyles[item.status] ?? "bg-zinc-800"}
                    />
                    <Badge
                      text={item.paymentStatus}
                      className={
                        paymentStyles[item.paymentStatus] ?? "bg-zinc-800"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-start justify-between gap-4 border-t border-zinc-800 pt-3">
                {/* Details open and close with the browser's built-in <details> */}
                <details className="group min-w-0 flex-1">
                  <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-zinc-300 transition hover:text-amber-500">
                    View details
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                  </summary>

                  <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs text-zinc-500 uppercase">
                        Customer
                      </dt>
                      <dd className="mt-0.5 text-zinc-200">
                        {item.customerName}
                      </dd>
                      {item.customerEmail && (
                        <dd className="mt-0.5 flex items-center gap-1.5 text-zinc-400">
                          <Mail className="h-3.5 w-3.5 text-amber-500" />
                          {item.customerEmail}
                        </dd>
                      )}
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500 uppercase">
                        Service
                      </dt>
                      <dd className="mt-0.5 text-zinc-200">
                        {item.serviceName}
                      </dd>
                      <dd className="mt-0.5 text-zinc-400">
                        {item.serviceCategory || "No category"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500 uppercase">
                        Requested on
                      </dt>
                      <dd className="mt-0.5 text-zinc-200">
                        {formatDate(item.createdAt)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500 uppercase">
                        Appointment ID
                      </dt>
                      <dd className="mt-0.5 font-mono text-xs text-zinc-200">
                        {item.id}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-zinc-500 uppercase">
                        Customer message
                      </dt>
                      <dd className="mt-0.5 text-zinc-200">
                        {item.message || "No message"}
                      </dd>
                    </div>
                  </dl>

                  <Link
                    href={`/services/${item.serviceId}`}
                    className="mt-4 inline-block text-sm font-medium text-amber-500 hover:underline"
                  >
                    View service
                  </Link>
                </details>

                <AppointmentActions
                  id={item.id}
                  status={item.status}
                  customerName={item.customerName}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
