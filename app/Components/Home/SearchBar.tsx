"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

// A small search icon in the navbar.
// Click it to open a search box. Submitting the form opens
// /services?search=... and the services page does the searching.
export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close search" : "Search services"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 transition hover:border-amber-500 hover:text-amber-500"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full border-b border-amber-500/20 bg-zinc-950/95 px-4 py-4 shadow-2xl backdrop-blur-md">
          <form
            action="/services"
            onSubmit={() => setIsOpen(false)}
            className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 p-1.5 pl-5 focus-within:border-amber-500"
          >
            <Search className="h-4 w-4 shrink-0 text-amber-500" />
            <input
              name="search"
              autoFocus
              required
              placeholder="Search services by name..."
              className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
