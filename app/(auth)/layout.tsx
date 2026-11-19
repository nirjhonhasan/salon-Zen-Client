import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"

// Sign-in and sign-up should not be visible to someone who is already logged in.
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (user) {
    redirect(user.role === "admin" ? "/dashboard/admin" : "/dashboard/customer")
  }

  return <>{children}</>
}
