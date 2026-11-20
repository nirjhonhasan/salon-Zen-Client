import { getTokenForServer } from "./GetTokenForSer"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// One registered user as the admin Users page needs it.
export type AdminUser = {
  id: string
  name: string
  email: string
  image: string | null
  role: string
  isBlocked: boolean
  createdAt: string | null
}

type ApiUser = {
  _id: string
  name?: string
  email?: string
  image?: string | null
  role?: string
  isBlocked?: boolean
  createdAt?: string
}

// Admin only: the server checks the token and the admin role.
export async function getAllUsers(): Promise<AdminUser[]> {
  const token = await getTokenForServer()

  const response = await fetch(`${API_URL}/users`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error("Server returned " + response.status)
  }

  const data: ApiUser[] = await response.json()

  return data.map((item) => ({
    id: item._id,
    name: item.name ?? "Unnamed",
    email: item.email ?? "",
    image: item.image ?? null,
    role: item.role || "customer",
    isBlocked: Boolean(item.isBlocked),
    createdAt: item.createdAt ?? null,
  }))
}
