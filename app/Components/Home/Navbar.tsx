import Image from "next/image"
import Link from "next/link"
import { getCurrentUser } from "@/lib/session"
import NavActions from "../NavActions"
import NavLinks from "./NavLinks"
import MobileMenu from "./MobileMenu"

export default async function Navbar() {
  // The navbar needs the user to decide between Sign In / avatar.
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/30 bg-zinc-950/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
       
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="relative block h-10 w-10 overflow-hidden rounded-full bg-zinc-900">
            <Image
              src="/logo.webp"
              alt="SalonZen logo"
              fill
              sizes="40px"
              priority
              className="object-cover"
            />
          </span>
          <span className="text-2xl font-bold tracking-wide text-white">
            Salon<span className="text-amber-500">Zen</span>
          </span>
        </Link>

        {/* Desktop links */}
        <NavLinks />

        {/* Account area (desktop) + menu button (mobile) */}
        <div className="flex items-center gap-2">
          <NavActions user={user} />
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  )
}
