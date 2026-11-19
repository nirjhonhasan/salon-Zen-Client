import { redirect } from "next/navigation"
import { requireUser } from "@/lib/session"

// /dashboard has no content of its own.
// It sends each user to the dashboard for their role.
export default async function DashboardPage() {
  const user = await requireUser()

  redirect(user.role === "admin" ? "/dashboard/admin" : "/dashboard/customer")
}
