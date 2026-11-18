import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth"; // তোমার বেটার অথ সার্ভার ইন্সট্যান্স
import { headers } from "next/headers";
import NavActions from "../NavActions";
import { ChevronDown } from "lucide-react";

export default async function Navbar() {

  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Logo & Brand Name */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-10 h-10 ">
            <Image
              src="/logo.webp" 
              alt="SalonZen Logo"
              fill
              className="object-cover group-hover:scale-105 transition"
            />
          </div>
          <span className="text-2xl font-bold text-white tracking-wider">
            Salon<span className="text-amber-500 ">Zen</span>
          </span>
        </Link>

        {/* Middle: Navigation Links (Design অনুযায়ী) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-300">
          <Link 
            href="/" 
            className="bg-amber-500 text-zinc-950 px-4 py-1.5 rounded-full font-semibold transition"
          >
            Home
          </Link>
          <div className="flex items-center gap-1 hover:text-amber-500 transition cursor-pointer">
            <span>Browse Services</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <Link href="/about" className="hover:text-amber-500 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-amber-500 transition">
            Contact
          </Link>
        </nav>

        {/* Right: Authentication Actions / User Info */}
        <NavActions session={session} />

      </div>
    </header>
  );
}