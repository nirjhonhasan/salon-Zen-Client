import Link from "next/link"
import type { SessionUser } from "@/app/Types"
import ProfileDropdown from "./ProfileDropdown"

// Right side of the navbar.
// Logged out -> Sign In / Sign Up buttons.
// Logged in  -> profile pill (avatar + name) that opens a dropdown.
export default function NavActions({ user }: { user: SessionUser | null }) {
  if (!user) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link
          href="/sign-in"
          className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:text-amber-500"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
        >
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="hidden sm:block">
      <ProfileDropdown user={user} showName />
    </div>
  )
}
