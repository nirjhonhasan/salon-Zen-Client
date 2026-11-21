import { CheckCircle2, CreditCard, XCircle } from "lucide-react"
import StatCard from "@/app/Components/dashboard/StatCard"
import { requireRole } from "@/lib/session"
import { getAllTransactions, type AdminTransaction } from "@/lib/transactions"

// Always show the newest data from the database.
export const dynamic = "force-dynamic"

function formatDate(value: string | null) {
  if (!value) return "-"

  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Read-only page: payments are written by the Stripe webhook only.
export default async function AdminTransactionsPage() {

  await requireRole("admin")

  let transactions: AdminTransaction[] = []
  let loadError = false

  try {
    transactions = await getAllTransactions()
  } catch (error) {
    console.error("Could not load transactions:", error)
    loadError = true
  }


  const paidList = transactions.filter((item) => item.status === "paid")
  const failedList = transactions.filter((item) => item.status === "failed")
  const totalReceived = paidList.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
          Admin / Transactions
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Every payment made through Stripe. This page is read-only.
        </p>
      </div>

      {loadError ? (
        <p className="rounded-2xl border border-dashed border-red-500/30 p-10 text-center text-sm text-red-400">
          We could not load the transactions. Please refresh the page.
        </p>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              title="All Transactions"
              value={transactions.length}
              icon={CreditCard}
            />
            <StatCard
              title="Successful Payments"
              value={paidList.length}
              icon={CheckCircle2}
              color="green"
            />
            <StatCard
              title="Failed Payments"
              value={failedList.length}
              icon={XCircle}
              color="red"
            />
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <p className="text-xs font-semibold tracking-wide text-amber-500 uppercase">
              Total received
            </p>
            <p className="mt-1 text-3xl font-bold text-white">
              ${totalReceived.toFixed(2)}
            </p>
          </div>

          {transactions.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-sm text-zinc-400">
              No payments yet.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-800 text-xs text-zinc-400 uppercase">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Stripe session</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-zinc-800 last:border-0"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">
                          {item.customerName}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {item.customerEmail}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-zinc-300">
                        {item.serviceName}
                      </td>
                      <td className="px-4 py-3 font-semibold text-amber-500">
                        {item.amount.toFixed(2)} {item.currency.toUpperCase()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            item.status === "paid"
                              ? "rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400"
                              : "rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400"
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-zinc-400">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="max-w-40 px-4 py-3">
                        <p className="truncate font-mono text-xs text-zinc-500">
                          {item.stripeSessionId}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}
