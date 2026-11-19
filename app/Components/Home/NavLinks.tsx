"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#about", label: "About" },
]

// Desktop navigation. Highlights the link for the current page.
export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-amber-500 text-zinc-950"
                : "text-zinc-300 hover:bg-zinc-900 hover:text-amber-500"
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
