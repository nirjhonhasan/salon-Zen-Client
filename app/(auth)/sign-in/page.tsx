"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2, Lock, Mail } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import AuthShell from "@/app/Components/Auth/AuthShell"
import AuthField from "@/app/Components/Auth/AuthField"
import GoogleButton from "@/app/Components/Auth/GoogleButton"

const SigninPage = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const email = data.email as string
    const password = data.password as string

    try {
      const { error: authError } = await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.success("Welcome back!")
            router.push("/dashboard")
            router.refresh()
          },
          onError: (ctx) => {
            const message = ctx.error.message || "Invalid email or password"
            setError(message)
            toast.error(message)
            setLoading(false)
          },
        }
      )

      if (authError) {
        setLoading(false)
      }
    } catch {
      setError("An unexpected error occurred")
      toast.error("An unexpected error occurred")
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your appointments"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-amber-500 hover:underline"
          >
            Sign Up
          </Link>
        </>
      }
    >
      <GoogleButton label="Continue with Google" />

      <div className="my-6 flex items-center gap-3 text-xs text-zinc-500">
        <span className="h-px flex-1 bg-zinc-800" />
        or sign in with email
        <span className="h-px flex-1 bg-zinc-800" />
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSignIn} className="space-y-4">
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
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-500 font-semibold text-zinc-950 transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthShell>
  )
}

export default SigninPage
