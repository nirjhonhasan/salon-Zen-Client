"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2, Lock, Mail, Upload, User } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { uploadImageToImgBB } from "@/lib/imgbb"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthShell from "@/app/Components/Auth/AuthShell"
import AuthField from "@/app/Components/Auth/AuthField"
import GoogleButton from "@/app/Components/Auth/GoogleButton"

const SignupPage = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Show a preview when the user picks an image.
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const showError = (message: string) => {
    setError(message)
    toast.error(message)
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const name = data.name as string
    const email = data.email as string
    const password = data.password as string

    // Password rule: at least 6 characters, 1 uppercase and 1 lowercase letter.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
    if (!passwordRegex.test(password)) {
      showError(
        "Password must be at least 6 characters with 1 uppercase and 1 lowercase letter."
      )
      return
    }

    try {
      let uploadedImageUrl = ""

      // 1. Upload the profile image to ImgBB if one was chosen.
      if (imageFile) {
        try {
          uploadedImageUrl = await uploadImageToImgBB(imageFile)
        } catch (uploadError) {
          showError(
            uploadError instanceof Error
              ? uploadError.message
              : "Failed to upload profile image"
          )
          return
        }
      }

      const { error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        image: uploadedImageUrl || undefined,
        callbackURL: "/",
      })

      if (authError) {
        showError(authError.message || "Sign up failed")
        return
      }

      toast.success("Account created. Welcome to SalonBook!")
      router.push("/dashboard")
      router.refresh()
    } catch {
      showError("An unexpected error occurred")
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join SalonBook and book your next treatment"
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-amber-500 hover:underline"
          >
            Sign In
          </Link>
        </>
      }
    >
      <GoogleButton label="Sign up with Google" />

      <div className="my-6 flex items-center gap-3 text-xs text-zinc-500">
        <span className="h-px flex-1 bg-zinc-800" />
        or sign up with email
        <span className="h-px flex-1 bg-zinc-800" />
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        <AuthField
          id="name"
          name="name"
          label="Full Name"
          icon={User}
          required
          placeholder="Enter your full name"
        />

        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email"
          icon={Mail}
          required
          placeholder="name@example.com"
        />

        <AuthField
          id="password"
          name="password"
          type="password"
          label="Password"
          icon={Lock}
          required
          placeholder="••••••••"
          hint="Min 6 chars, at least 1 uppercase & 1 lowercase letter"
        />

        {/* Profile image upload with a square preview */}
        <div className="space-y-2">
          <Label htmlFor="image" className="text-zinc-300">
            Profile Image
          </Label>
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-800/50">
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Upload className="h-5 w-5 text-zinc-500" />
              )}
            </div>
            <div className="flex-1">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer rounded-xl border-zinc-700 bg-zinc-800/60 text-xs text-zinc-300 file:rounded-md file:border-0 file:bg-amber-500 file:px-2 file:text-xs file:font-semibold file:text-zinc-950"
              />
              <p className="mt-1 text-[11px] text-zinc-500">
                PNG, JPG, WEBP (optional)
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-500 font-semibold text-zinc-950 transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </AuthShell>
  )
}

export default SignupPage
