import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import type { SessionUser } from "@/app/Types"


export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return null
  }

  return session.user as SessionUser
}




export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  if (user.isBlocked) {
    redirect("/blocked")
  }

  return user
}

// Use this in pages that belong to one role only.
// An admin who opens a customer page is sent back to the admin dashboard.
export async function requireRole(
  role: "admin" | "customer"
): Promise<SessionUser> {
  const user = await requireUser()

  if ((user.role || "customer") !== role) {
    redirect(user.role === "admin" ? "/dashboard/admin" : "/dashboard/customer")
  }

  return user
}
