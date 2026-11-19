"use client"

import { useState } from "react"
import { ImagePlus, Loader2, Plus } from "lucide-react"
import { uploadImageToImgBB } from "@/lib/imgbb"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const categories = [
  "Haircut & Styling",
  "Hair Coloring",
  "Hair Treatment",
  "Facial & Skincare",
  "Makeup",
  "Manicure & Pedicure",
  "Spa & Massage",
]

// Same look for every input, so the form stays easy to read.
const inputClass =
  "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"

export default function AddServiceForm() {
  // One state value for each form field.
  const [serviceName, setServiceName] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("active")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Show a small preview when the admin picks an image.
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (file) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")

    // Check the form before sending anything.
    if (!imageFile) {
      setError("Please choose a service image.")
      return
    }

    if (Number(price) <= 0 || Number(duration) <= 0) {
      setError("Price and duration must be more than 0.")
      return
    }

    setLoading(true)

    try {
      // 1. Upload the image and get its link.
      const imageUrl = await uploadImageToImgBB(imageFile)

      // 2. Get a token that proves we are logged in.
      const tokenResponse = await fetch("/api/token")
      if (!tokenResponse.ok) {
        throw new Error("Please sign in again.")
      }
      const { token } = await tokenResponse.json()

      // 3. Send the service to the Express server.
      const response = await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceName,
          category,
          description,
          price: Number(price),
          duration: Number(duration),
          image: imageUrl,
          status,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Could not add the service.")
      }

      // 4. Clear the form for the next service.
      setSuccess("Service added successfully.")
      setServiceName("")
      setPrice("")
      setDuration("")
      setDescription("")
      setImageFile(null)
      setPreview("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
    >
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {success}
        </p>
      )}

      {/* Basic details */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm text-zinc-300">Service name</label>
          <input
            required
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="e.g. Layered Haircut"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-zinc-300">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-zinc-300">Price ($)</label>
          <input
            required
            type="number"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="40"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-zinc-300">Duration (minutes)</label>
          <input
            required
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="60"
            className={inputClass}
          />
        </div>
      </div>

      {/* Image upload */}
      <div className="space-y-1.5">
        <label className="text-sm text-zinc-300">Service image</label>
        <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-4 transition hover:border-amber-500">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-900">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlus className="h-7 w-7 text-zinc-600" />
            )}
          </div>
          <div className="text-sm">
            <p className="text-zinc-200">
              {imageFile ? imageFile.name : "Click to choose an image"}
            </p>
            <p className="text-xs text-zinc-500">PNG or JPG</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-zinc-300">Description</label>
        <textarea
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description of the service"
          className={inputClass}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-zinc-300">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={inputClass}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            Add Service
          </>
        )}
      </button>
    </form>
  )
}
