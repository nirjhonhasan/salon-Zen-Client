import { getTokenForServer } from "./GetTokenForSer"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// One payment record as the admin Transactions page needs it.
export type AdminTransaction = {
  id: string
  appointmentId: string
  customerName: string
  customerEmail: string
  serviceName: string
  amount: number
  currency: string
  status: string
  stripeSessionId: string
  createdAt: string | null
}

type ApiTransaction = {
  _id: string
  appointmentId?: string
  customerName?: string
  customerEmail?: string
  serviceName?: string
  amount?: number | string
  currency?: string
  status?: string
  stripeSessionId?: string
  createdAt?: string
}

// Admin only: the server checks the token and the admin role.
export async function getAllTransactions(): Promise<AdminTransaction[]> {
  const token = await getTokenForServer()

  const response = await fetch(`${API_URL}/transactions`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error("Server returned " + response.status)
  }

  const data: ApiTransaction[] = await response.json()

  return data.map((item) => ({
    id: item._id,
    appointmentId: item.appointmentId ?? "",
    customerName: item.customerName ?? "User removed",
    customerEmail: item.customerEmail ?? "",
    serviceName: item.serviceName ?? "Service removed",
    amount: Number(item.amount ?? 0),
    currency: item.currency ?? "usd",
    status: item.status ?? "paid",
    stripeSessionId: item.stripeSessionId ?? "",
    createdAt: item.createdAt ?? null,
  }))
}
