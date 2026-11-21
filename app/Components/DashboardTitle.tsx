"use client"

import { usePathname } from "next/navigation"

// The page name for each dashboard route.
// Add a line here when you create a new dashboard page.
const titles: Record<string, string> = {
  "/dashboard/admin": "Admin Overview",
  "/dashboard/admin/services/new": "Add Service",
  "/dashboard/admin/services": "Manage Services",
  "/dashboard/admin/users": "Manage Users",
  "/dashboard/admin/appointments": "Manage Appointments",
  "/dashboard/admin/transactions": "Transactions",
  "/dashboard/customer": "Customer Overview",
  "/dashboard/customer/appointments": "My Appointments",
  "/dashboard/profile": "My Profile",
}

// Shows the name of the page you are on, in the dashboard header.
export default function DashboardTitle() {
  const pathname = usePathname()

  let title = titles[pathname] || "Dashboard"

  // The edit page has an id in the URL, so it is not in the list above.
  if (pathname.endsWith("/edit")) {
    title = "Edit Service"
  }

  return (
    <span className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white">
      {title}
    </span>
  )
}
