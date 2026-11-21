"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, X } from "lucide-react"
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

// Confirm and Cancel buttons for one appointment (admin only).
// Confirm works on pending appointments. Cancel works on pending or confirmed.
export default function AppointmentActions({
  id,
  status,
  customerName,
}: {
  id: string
  status: string
  customerName: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  async function run(action: "confirm" | "cancel", successMessage: string) {
    setLoading(true)

    try {
      await callServer(`/appointments/${id}/${action}`, "PATCH")
      toast.success(successMessage)
      setShowCancelDialog(false)
      router.refresh() // reload the list with the new status
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const canConfirm = status === "pending"
  const canCancel = status === "pending" || status === "confirmed"

  if (!canConfirm && !canCancel) {
    return <span className="text-xs text-zinc-500">No actions</span>
  }

  const buttonClass =
    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition disabled:opacity-50"

  return (
    <div className="flex flex-wrap gap-2">
      {canConfirm && (
        // Confirming is safe to undo with Cancel, so it needs no dialog.
        <button
          onClick={() => run("confirm", "Appointment confirmed.")}
          disabled={loading}
          className={`${buttonClass} border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10`}
        >
          <Check className="h-3.5 w-3.5" />
          Confirm
        </button>
      )}

      {canCancel && (
        <button
          onClick={() => setShowCancelDialog(true)}
          disabled={loading}
          className={`${buttonClass} border-red-500/30 text-red-400 hover:bg-red-500/10`}
        >
          <X className="h-3.5 w-3.5" />
          {canConfirm ? "Reject" : "Cancel"}
        </button>
      )}

      {/* Confirmation dialog for the destructive action */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              The appointment of {customerName} will be cancelled and its time
              slot becomes free again. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => run("cancel", "Appointment cancelled.")}
              disabled={loading}
            >
              {loading ? "Cancelling..." : "Cancel appointment"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
