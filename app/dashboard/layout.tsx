import type { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSideBar from "@/app/Components/DashboardSideBar"
import DashboardTitle from "@/app/Components/DashboardTitle"
import { requireUser } from "@/lib/session"

// This layout wraps every /dashboard page.
// requireUser() redirects to /sign-in when the visitor is not logged in
// and to /blocked when the account is blocked.
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await requireUser()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-100">
        <DashboardSideBar user={user} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center border-b border-zinc-800 bg-zinc-950/80 px-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-zinc-400 hover:text-amber-500" />
              <DashboardTitle />
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
