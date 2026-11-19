"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { authClient } from "@/lib/auth-client"

// One sign-out button used in the navbar, the sidebar and the blocked page.
export default function SignOutButton({
  className = "",
}: {
  className?: string
}) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  async function handleSignOut() {
    setIsPending(true)

    await authClient.signOut()

    router.push("/sign-in")
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className={className}
    >
      <LogOut className="h-4 w-4" />
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  )
}
