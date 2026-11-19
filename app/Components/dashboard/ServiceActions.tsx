"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Power, Trash2 } from "lucide-react"
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

// The Edit, Activate/Deactivate and Delete buttons for one table row.
export default function ServiceActions({
  id,
  name,
  status,
}: {
  id: string
  name: string
  status: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Switch between active and inactive.
  async function handleToggleStatus() {
    const newStatus = status === "active" ? "inactive" : "active"
    setLoading(true)

    try {
      await callServer(`/services/${id}/status`, "PATCH", {
        status: newStatus,
      })
      toast.success(`${name} is now ${newStatus}.`)
      router.refresh() // reload the table with the new data
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  // Delete the service (runs after the admin confirms in the dialog).
  async function handleDelete() {
    setLoading(true)

    try {
      await callServer(`/services/${id}`, "DELETE")
      toast.success(`${name} was deleted.`)
      setShowDeleteDialog(false)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const buttonClass =
    "inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-2.5 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-amber-500 hover:text-amber-500 disabled:opacity-50"

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/dashboard/admin/services/${id}/edit`}
        className={buttonClass}
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </Link>

      <button
        onClick={handleToggleStatus}
        disabled={loading}
        className={buttonClass}
      >
        <Power className="h-3.5 w-3.5" />
        {status === "active" ? "Deactivate" : "Activate"}
      </button>

      <button
        onClick={() => setShowDeleteDialog(true)}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-2.5 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>

      {/* Confirmation dialog for the dangerous action */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this service?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{name}&quot; will be removed for good. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
