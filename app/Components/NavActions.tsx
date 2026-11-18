"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { UserSession } from "../Types";



export default function NavActions({ session }: {session:UserSession}) {
  return (
    <div className="flex items-center space-x-4">
      {/* Search Icon button */}
      <button className="text-zinc-300 hover:text-amber-500 transition p-2">
        <Search className="w-5 h-5" />
      </button>

      {session?.user ? (
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-zinc-200 hidden sm:inline-block">
            Hi, <span className="text-amber-500 font-semibold">{session.user.name}</span>
          </span>
          {/* তোমার তৈরি করা Profile Dropdown */}
          <ProfileDropdown user={session.user} />
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-zinc-300 hover:text-amber-500 transition px-3 py-2"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-medium bg-amber-500 hover:bg-amber-600 text-zinc-950 px-4 py-2 rounded-full transition font-semibold"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}