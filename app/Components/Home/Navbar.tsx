import Image from "next/image"
import Link from "next/link"
import { getCurrentUser } from "@/lib/session"
import NavActions from "../NavActions"
import NavLinks from "./NavLinks"
import MobileMenu from "./MobileMenu"
import SearchBar from "./SearchBar"

export default async function Navbar() {
  // The navbar needs the user to decide between Sign In / avatar.
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-500/20 bg-zinc-950/90 backdrop-blur-md">
      {/* Thin gold line along the bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="relative block h-11 w-11 overflow-hidden">
            <Image
              src="/logo.webp"
              alt="SalonBook logo"
              fill
              sizes="40px"
              priority
              className="object-cover"
            />
          </span>
          <span className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-wide text-white">
            Salon<span className="text-amber-500">Zone</span>
          </span>
        </Link>

        {/* Desktop links */}
        <NavLinks />

        {/* Account area (desktop) + menu button (mobile) */}
        <div className="flex items-center gap-2">
          <SearchBar />
          <NavActions user={user} />
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  )
}
