"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SigninPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const email = data.email as string;
    const password = data.password as string;

    try {
      const { error: authError } = await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            router.push("/dashboard");
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Invalid email or password");
            setLoading(false);
          },
        }
      );

      if (authError) {
        setError(authError.message || "Sign in failed");
        setLoading(false);
      }
    } catch {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold text-amber-500">
            SalonBook
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="bg-zinc-800 border-zinc-700 text-zinc-100 focus-visible:ring-amber-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="bg-zinc-800 border-zinc-700 text-zinc-100 focus-visible:ring-amber-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-zinc-400">
            Dont have an account?{" "}
            <Link href="/sign-up" className="text-amber-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SigninPage;