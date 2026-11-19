import Link from "next/link"
import { redirect } from "next/navigation"
import { ShieldAlert } from "lucide-react"
import { getCurrentUser } from "@/lib/session"
import SignOutButton from "@/app/Components/SignOutButton"

export default async function BlockedPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-zinc-900 p-8 text-center">
        <ShieldAlert className="mx-auto h-10 w-10 text-red-400" />

        <h1 className="mt-4 text-2xl font-bold text-white">Account blocked</h1>

        <p className="mt-2 text-sm text-zinc-400">
          An administrator has blocked this account. If you think this is a
          mistake, please contact support.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <SignOutButton className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600" />

          <Link
            href="/"
            className="text-sm text-zinc-400 transition hover:text-amber-500"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
