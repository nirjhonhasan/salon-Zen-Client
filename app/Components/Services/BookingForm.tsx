"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Loader2,
  MessageSquare,
} from "lucide-react"
import { toast } from "sonner"
import { callServer } from "@/lib/api"
import { TIME_SLOTS } from "@/lib/time-slots"

// Today as YYYY-MM-DD in the visitor's own time zone.
function getToday() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${month}-${day}`
}

// Booking form shown on the service details page (customers only).
export default function BookingForm({
  serviceId,
  price,
}: {
  serviceId: string
  price: number
}) {
  const router = useRouter()
  const [date, setDate] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [message, setMessage] = useState("")
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Ask the server which slots are taken whenever the date changes.
  useEffect(() => {
    if (!date) return

    let cancelled = false

    async function loadBookedSlots() {
      setLoadingSlots(true)
      try {
        const data = await callServer(
          `/appointments/booked?serviceId=${serviceId}&date=${date}`,
          "GET"
        )
        if (!cancelled) {
          setBookedSlots(data.slots)
          // Clear the chosen slot if it was just taken.
          setTimeSlot((current) =>
            data.slots.includes(current) ? "" : current
          )
        }
      } catch (err) {
        if (!cancelled) {
          toast.error(
            err instanceof Error ? err.message : "Could not load time slots."
          )
        }
      } finally {
        if (!cancelled) setLoadingSlots(false)
      }
    }

    loadBookedSlots()

    return () => {
      cancelled = true
    }
  }, [date, serviceId])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!date) {
      setError("Please choose a date.")
      return
    }
    if (date < getToday()) {
      setError("The date cannot be in the past.")
      return
    }
    if (!timeSlot) {
      setError("Please choose a time slot.")
      return
    }

    setSubmitting(true)

    try {
      await callServer("/appointments", "POST", {
        serviceId,
        appointmentDate: date,
        timeSlot,
        message,
      })
      toast.success("Appointment booked! Waiting for confirmation.")
      router.push("/dashboard/customer")
      router.refresh()
    } catch (err) {
      const text =
        err instanceof Error ? err.message : "Could not book the appointment."
      setError(text)
      toast.error(text)
    } finally {
      setSubmitting(false)
    }
  }

  // Date shown in a friendly way, e.g. "Mon, Nov 24, 2026".
  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : ""

  const fieldClass =
    "w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"

  return (
    <form
      id="booking"
      onSubmit={handleSubmit}
      className="scroll-mt-24 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8"
    >
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Book your appointment</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Pick a day and a time. It only takes a minute.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: date and time */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="flex items-center gap-2 text-sm font-medium text-zinc-200"
            >
              <StepNumber number={1} />
              <CalendarDays className="h-4 w-4 text-amber-500" />
              Choose a date
            </label>
            <input
              id="date"
              type="date"
              min={getToday()}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={`${fieldClass} scheme-dark`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="timeSlot"
              className="flex items-center gap-2 text-sm font-medium text-zinc-200"
            >
              <StepNumber number={2} />
              <Clock className="h-4 w-4 text-amber-500" />
              Choose a time
              {loadingSlots && (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-400" />
              )}
            </label>

            {/* appearance-none hides the browser arrow; we draw our own */}
            <div className="relative">
              <select
                id="timeSlot"
                value={timeSlot}
                disabled={loadingSlots}
                onChange={(event) => setTimeSlot(event.target.value)}
                className={`${fieldClass} appearance-none pr-10 disabled:opacity-60`}
              >
                <option value="">Select a time slot</option>
                {TIME_SLOTS.map((slot) => {
                  const taken = bookedSlots.includes(slot)
                  return (
                    <option key={slot} value={slot} disabled={taken}>
                      {taken ? `${slot} (booked)` : slot}
                    </option>
                  )
                })}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            </div>

            <p className="text-xs text-zinc-500">
              {date
                ? "Booked times cannot be selected."
                : "Tip: pick a date first to see which times are free."}
            </p>
          </div>
        </div>

        {/* Right: message */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="message"
            className="flex items-center gap-2 text-sm font-medium text-zinc-200"
          >
            <StepNumber number={3} />
            <MessageSquare className="h-4 w-4 text-amber-500" />
            Message{" "}
            <span className="font-normal text-zinc-500">(optional)</span>
          </label>
          <textarea
            id="message"
            maxLength={500}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Anything we should know? Allergies, style ideas..."
            className={`${fieldClass} min-h-32 flex-1 resize-none`}
          />
          <p className="text-right text-xs text-zinc-500">
            {message.length}/500
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-5 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Bottom bar: summary on the left, button on the right */}
      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-amber-500 uppercase">
            Your booking
          </p>
          <p className="mt-1 text-sm text-zinc-300">
            {date && timeSlot
              ? `${prettyDate} at ${timeSlot}`
              : "Select a date and time to see your booking."}
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Total:{" "}
            <span className="text-lg font-bold text-amber-500">${price}</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600 disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Booking..." : "Confirm booking"}
        </button>
      </div>
    </form>
  )
}

// Small round number badge used for the form steps.
function StepNumber({ number }: { number: number }) {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-zinc-950">
      {number}
    </span>
  )
}
