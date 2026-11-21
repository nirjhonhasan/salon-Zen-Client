"use client"

import ErrorMessage from "@/app/Components/ErrorMessage"

// Catches an unexpected error on any public or auth page.
export default function Error({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  return <ErrorMessage error={error} retry={retry} />
}
