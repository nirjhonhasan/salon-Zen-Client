import {
  LayoutDashboard,
  PlusCircle,
  Scissors,
  User,
  Users,
  Wrench,
} from "lucide-react"

// The sidebar links for each role.
export function getSidebarItems(role: string) {
  if (role === "admin") {
    return [
      { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      {
        title: "Add Service",
        href: "/dashboard/admin/services/new",
        icon: PlusCircle,
      },
      {
        title: "Manage Services",
        href: "/dashboard/admin/services",
        icon: Wrench,
      },
      
      {
        title: "Manage Users",
        href: "/dashboard/admin/users",
        icon: Users,
      },
      { title: "Browse Services", href: "/services", icon: Scissors },
      { title: "My Profile", href: "/dashboard/profile", icon: User },
    ]
  }

  return [
    { title: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
    { title: "Browse Services", href: "/services", icon: Scissors },
    { title: "My Profile", href: "/dashboard/profile", icon: User },
  ]
}
