"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Ban, CheckCircle2, ShieldPlus } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { callServer } from "@/lib/api"

type Dialog = "block" | "admin" | null

// Block / Unblock and Make Admin buttons for one user row.
export default function UserActions({
  id,
  name,
  role,
  isBlocked,
}: {
  id: string
  name: string
  role: string
  isBlocked: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [dialog, setDialog] = useState<Dialog>(null)

  async function run(
    path: string,
    body: object | undefined,
    successMessage: string
  ) {
    setLoading(true)

    try {
      await callServer(path, "PATCH", body)
      toast.success(successMessage)
      setDialog(null)
      router.refresh() // reload the table with the new data
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  function handleBlockToggle() {
    run(
      `/users/${id}/block`,
      { isBlocked: !isBlocked },
      `${name} was ${isBlocked ? "unblocked" : "blocked"}.`
    )
  }

  function handleMakeAdmin() {
    run(`/users/${id}/role`, undefined, `${name} is now an admin.`)
  }

  const buttonClass =
    "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition disabled:opacity-50"

  // Admin accounts are never blocked or changed from this page.
  if (role === "admin") {
    return <span className="text-xs text-zinc-500">No actions</span>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {isBlocked ? (
        // Unblocking is safe, so it needs no confirmation.
        <button
          onClick={handleBlockToggle}
          disabled={loading}
          className={`${buttonClass} border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Unblock
        </button>
      ) : (
        <button
          onClick={() => setDialog("block")}
          disabled={loading}
          className={`${buttonClass} border-red-500/30 text-red-400 hover:bg-red-500/10`}
        >
          <Ban className="h-3.5 w-3.5" />
          Block
        </button>
      )}

      <button
        onClick={() => setDialog("admin")}
        disabled={loading || isBlocked}
        title={isBlocked ? "Unblock this user first" : undefined}
        className={`${buttonClass} border-zinc-700 text-zinc-200 hover:border-amber-500 hover:text-amber-500`}
      >
        <ShieldPlus className="h-3.5 w-3.5" />
        Make Admin
      </button>

      {/* Confirmation dialogs for the risky actions */}
      <AlertDialog
        open={dialog === "block"}
        onOpenChange={(open) => !open && setDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Block this user?</AlertDialogTitle>
            <AlertDialogDescription>
              {name} will no longer be able to use protected features of
              SalonBook. You can unblock them at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlockToggle} disabled={loading}>
              {loading ? "Blocking..." : "Block"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={dialog === "admin"}
        onOpenChange={(open) => !open && setDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Make this user an admin?</AlertDialogTitle>
            <AlertDialogDescription>
              {name} will get full admin access: services, appointments, users
              and transactions. This page cannot undo it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleMakeAdmin} disabled={loading}>
              {loading ? "Saving..." : "Make Admin"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
