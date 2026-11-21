"use client"

import ErrorMessage from "@/app/Components/ErrorMessage"

// Catches an unexpected error on any dashboard page.
// The sidebar and header stay visible, only the page content is replaced.
export default function DashboardError({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  return <ErrorMessage error={error} retry={retry} />
}
