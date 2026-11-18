"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  LayoutDashboard, 
  User, 
  LogOut 
} from "lucide-react";

interface ProfileDropdownProps {
  user?: {
    name?: string;
    email?: string;
    image?: string | null;
  } | null;
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  // ইউজারের নামের প্রথম অক্ষর দিয়ে Fallback তৈরি করা (যদি ছবি না থাকে)
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition cursor-pointer inline-block">
          <Avatar className="w-10 h-10 border border-zinc-700 hover:border-amber-500 transition">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} className="object-cover" />
            <AvatarFallback className="bg-zinc-800 text-amber-500 font-semibold">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </PopoverTrigger>

      <PopoverContent 
        className="w-56 bg-zinc-900 border-zinc-800 text-zinc-100 p-2 shadow-xl rounded-xl mr-4"
        align="end"
      >
        {/* ইউজার ইনফো সেকশন */}
        <div className="px-3 py-2 border-b border-zinc-800 mb-1">
          <p className="text-sm font-medium text-white truncate">{user?.name || "User Account"}</p>
          <p className="text-xs text-zinc-400 truncate">{user?.email || "user@example.com"}</p>
        </div>

        {/* মেনু অপশনসমূহ */}
        <div className="space-y-1">
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-amber-500 transition"
          >
            <LayoutDashboard className="w-4 h-4 text-amber-500" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-amber-500 transition"
          >
            <User className="w-4 h-4 text-amber-500" />
            <span>Profile</span>
          </Link>

          <div className="h-[1px] bg-zinc-800 my-1" />

          <button
            onClick={() => {
              setIsOpen(false);
              handleSignOut();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}