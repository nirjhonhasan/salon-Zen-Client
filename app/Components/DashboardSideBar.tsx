"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { SessionUser } from "@/app/Types"
import SignOutButton from "./SignOutButton"
import { getSidebarItems } from "./sidebar-items"

export default function DashboardSideBar({ user }: { user: SessionUser }) {
  const pathname = usePathname()
  const role = user.role || "customer"
  const items = getSidebarItems(role)

  return (
    <Sidebar className="border-r border-zinc-800 text-zinc-300 [&_[data-slot=sidebar-inner]]:bg-zinc-950 [&_[data-slot=sidebar-inner]]:text-zinc-300">
      {/* Brand */}
      <SidebarHeader className="border-b border-zinc-800/80 px-5 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative block h-10 w-10 overflow-hidden rounded-full bg-zinc-900">
            <Image
              src="/logo.webp"
              alt="SalonBook logo"
              fill
              sizes="40px"
              className="object-cover"
            />
          </span>
          <span className="text-xl font-bold tracking-wide text-white">
            Salon<span className="text-amber-500">Book</span>
          </span>
        </Link>
      </SidebarHeader>

      {/* Role based links */}
      <SidebarContent className="px-3 py-5">
        <p className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
          {role === "admin" ? "Admin Panel" : "Customer Panel"}
        </p>

        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  isActive={isActive}
                  className={
                    isActive
                      ? "bg-amber-500 text-zinc-950 hover:bg-amber-500 hover:text-zinc-950"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-amber-500"
                  }
                >
                  <Icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* User + sign out */}
      <SidebarFooter className="border-t border-zinc-800/80 p-4">
        <div className="mb-3 px-2">
          <p className="truncate text-sm font-medium text-white">{user.name}</p>
          <p className="truncate text-xs text-zinc-500 capitalize">
            Role: {role}
          </p>
        </div>

        <SignOutButton className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300" />
      </SidebarFooter>
    </Sidebar>
  )
}
