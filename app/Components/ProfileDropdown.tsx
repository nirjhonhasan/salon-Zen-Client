"use client"

import Link from "next/link"
import { ChevronDown, LayoutDashboard, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { SessionUser } from "@/app/Types"
import SignOutButton from "./SignOutButton"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

// The profile button. Clicking it opens a small menu.
// showName = true  -> a pill with avatar + name (public navbar)
// showName = false -> just the round avatar (dashboard header)
export default function ProfileDropdown({
  user,
  showName = false,
}: {
  user: SessionUser
  showName?: boolean
}) {
  return (
    <Popover>
      <PopoverTrigger
        className={
          showName
            ? "flex items-center gap-3 rounded-full border border-amber-500/30 bg-zinc-900/70 py-1 pr-4 pl-1 transition hover:border-amber-500 focus-visible:outline-none"
            : "rounded-full ring-2 ring-transparent transition hover:ring-amber-500/60 focus-visible:ring-amber-500 focus-visible:outline-none"
        }
      >
        <Avatar size="lg" className={showName ? "ring-2 ring-amber-500" : ""}>
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback className="bg-zinc-800 font-semibold text-amber-500">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        {showName && (
          <>
            <span className="hidden text-left leading-tight lg:block">
              <span className="block text-[10px] font-semibold tracking-[0.2em] text-amber-500 uppercase">
                Welcome
              </span>
              <span className="block max-w-32 truncate font-[family-name:var(--font-heading)] text-lg font-semibold text-white">
                {user.name}
              </span>
            </span>
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          </>
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-64 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-100 shadow-2xl"
      >
        {/* Who is logged in */}
        <div className="border-b border-zinc-800 px-3 pt-2 pb-3">
          <p className="truncate font-[family-name:var(--font-heading)] text-xl font-semibold text-white">
            {user.name}
          </p>
          <p className="truncate text-xs text-zinc-400">{user.email}</p>
          <span className="mt-2 inline-block rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-500 capitalize">
            {user.role || "customer"}
          </span>
        </div>

        {/* Links */}
        <div className="mt-1 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-amber-500"
          >
            <LayoutDashboard className="h-4 w-4 text-amber-500" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-amber-500"
          >
            <User className="h-4 w-4 text-amber-500" />
            Profile
          </Link>
        </div>

        <div className="my-1 h-px bg-zinc-800" />

        <SignOutButton className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300" />
      </PopoverContent>
    </Popover>
  )
}
