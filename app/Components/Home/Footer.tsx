import Image from "next/image"
import Link from "next/link"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "Browse Services", href: "/services" },
  { title: "Sign In", href: "/sign-in" },
  { title: "Sign Up", href: "/sign-up" },
]

const socialLinks = [
  { title: "Facebook", href: "https://facebook.com" },
  { title: "Instagram", href: "https://instagram.com" },
  { title: "Twitter", href: "https://twitter.com" },
]

// Small heading used by every footer column.
function ColumnTitle({ children }: { children: string }) {
  return <h3 className="mb-4 text-base font-semibold text-white">{children}</h3>
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Logo, short description and social links */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="relative block h-10 w-10 overflow-hidden">
                <Image
                  src="/logo.webp"
                  alt="SalonBook logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <span className="text-xl font-bold text-white">
                Salon<span className="text-amber-500">Zone</span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed">
              Book hair, skin and beauty treatments online. Pick a service,
              choose a time, and we will take care of the rest.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-zinc-800 px-3 py-1 text-xs transition hover:border-amber-500 hover:text-amber-500"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation links */}
          <div>
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-amber-500"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact information and address */}
          <div>
            <ColumnTitle>Contact Us</ColumnTitle>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>123 Salon Avenue, Gulshan, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-amber-500" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-amber-500" />
                <span>support@salonbook.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Opening hours */}
          <div>
            <ColumnTitle>Opening Hours</ColumnTitle>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <p className="font-medium text-zinc-200">
                    Saturday - Thursday
                  </p>
                  <p>10:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <p className="font-medium text-zinc-200">Friday</p>
                  <p>3:00 PM - 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-zinc-900 pt-6 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} SalonBook. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
