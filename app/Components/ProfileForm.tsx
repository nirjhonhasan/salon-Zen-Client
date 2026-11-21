"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { uploadImageToImgBB } from "@/lib/imgbb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SessionUser } from "@/app/Types"

// 7 to 15 digits, with an optional + at the start and spaces or dashes inside.
const phoneRegex = /^\+?[0-9][0-9\s-]{5,18}[0-9]$/

export default function ProfileForm({ user }: { user: SessionUser }) {
  const router = useRouter()

  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(user.phone || "")
  const [image, setImage] = useState(user.image || "")
  const [preview, setPreview] = useState(user.image || "")
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // 1. Pick a file -> upload to ImgBB -> keep the public URL
  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      const url = await uploadImageToImgBB(file)
      setImage(url)
      setPreview(url)
    } catch (uploadError) {
      toast.error(
        uploadError instanceof Error ? uploadError.message : "Upload failed"
      )
    } finally {
      setIsUploading(false)
    }
  }

  // 2. Save the name + image with BetterAuth
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters")
      return
    }

    // The phone is optional. If it is filled, it must look like a phone number.
    if (phone.trim() && !phoneRegex.test(phone.trim())) {
      toast.error("Please enter a valid phone number")
      return
    }

    setIsSaving(true)

    const { error: updateError } = await authClient.updateUser({
      name: name.trim(),
      image: image || undefined,
      phone: phone.trim(),
    })

    if (updateError) {
      toast.error(updateError.message || "Could not save your profile")
      setIsSaving(false)
      return
    }

    toast.success("Profile updated")
    setIsSaving(false)
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-amber-500/20 bg-zinc-900 p-6 sm:p-8"
    >
      <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-white">
        Edit Details
      </h2>

      {/* Avatar + upload */}
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-zinc-700 bg-zinc-800">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Profile picture"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xl font-semibold text-amber-500">
              {name.slice(0, 1).toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <Label
            htmlFor="image"
            className="mb-2 inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-amber-500 hover:text-amber-500"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Change picture"}
          </Label>

          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isUploading}
            className="hidden"
          />

          <p className="mt-2 text-xs text-zinc-500">PNG, JPG or WEBP</p>
        </div>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-zinc-300">
          Full name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="border-zinc-700 bg-zinc-800 text-zinc-100 focus-visible:ring-amber-500"
        />
      </div>

      {/* Phone (optional) */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-zinc-300">
          Phone <span className="text-zinc-500">(optional)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+8801XXXXXXXXX"
          maxLength={20}
          className="border-zinc-700 bg-zinc-800 text-zinc-100 focus-visible:ring-amber-500"
        />
      </div>

      {/* Email (not editable here) */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300">
          Email
        </Label>
        <Input
          id="email"
          value={user.email}
          disabled
          className="border-zinc-800 bg-zinc-950 text-zinc-500"
        />
        <p className="text-xs text-zinc-500">
          Your email is used to sign in, so it cannot be changed here.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSaving || isUploading}
        className="bg-amber-500 font-semibold text-zinc-950 hover:bg-amber-600"
      >
        {isSaving ? "Saving..." : "Save changes"}
      </Button>
    </form>
  )
}
