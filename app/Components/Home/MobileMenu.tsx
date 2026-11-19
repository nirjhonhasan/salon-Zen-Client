"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Menu, User, X } from "lucide-react"
import SignOutButton from "../SignOutButton"
import type { SessionUser } from "@/app/Types"

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#about", label: "About" },
]

// Small menu for phones and tablets.
export default function MobileMenu({ user }: { user: SessionUser | null }) {
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 transition hover:border-amber-500 hover:text-amber-500"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full border-b border-zinc-800 bg-zinc-950 px-4 pb-6 pt-2 shadow-2xl">
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-amber-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 border-t border-zinc-800 pt-4">
            {user ? (
              <div className="flex flex-col gap-1">
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-amber-500"
                >
                  <LayoutDashboard className="h-4 w-4 text-amber-500" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-amber-500"
                >
                  <User className="h-4 w-4 text-amber-500" />
                  Profile
                </Link>
                <SignOutButton className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300" />
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className="flex-1 rounded-full border border-zinc-700 px-4 py-2.5 text-center text-sm font-medium text-zinc-200 transition hover:border-amber-500 hover:text-amber-500"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={closeMenu}
                  className="flex-1 rounded-full bg-amber-500 px-4 py-2.5 text-center text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
