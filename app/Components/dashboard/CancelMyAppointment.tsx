"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
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

// The "Cancel" button a customer sees on their own PENDING appointment.
export default function CancelMyAppointment({
  id,
  serviceName,
}: {
  id: string
  serviceName: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  // Runs after the customer says "Yes" in the dialog.
  async function handleCancel() {
    setLoading(true)

    try {
      await callServer(`/appointments/${id}/cancel-mine`, "PATCH")
      toast.success("Your appointment was cancelled.")
      setShowDialog(false)
      router.refresh() // reload the list with the new status
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
      >
        <X className="h-3.5 w-3.5" />
        Cancel
      </button>

      {/* Confirmation dialog for the dangerous action */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              Your booking for &quot;{serviceName}&quot; will be cancelled. This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} disabled={loading}>
              {loading ? "Cancelling..." : "Yes, cancel"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
