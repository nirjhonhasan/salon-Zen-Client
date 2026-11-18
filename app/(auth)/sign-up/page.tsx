"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import { Upload } from "lucide-react";

const SignupPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  // ইমেজ সিলেক্ট করলে প্রিভিউ দেখানোর হ্যান্ডলার
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const name = data.name as string;
    const email = data.email as string;
    const password = data.password as string;

    // পাসওয়ার্ড ভ্যালিডেশন (কমপক্ষে ৬ অক্ষর, ১টি বড় ও ১টি ছোট হাতের অক্ষর)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters with 1 uppercase and 1 lowercase letter."
      );
      setLoading(false);
      return;
    }

    try {
      let uploadedImageUrl = "";

      // ১. যদি ইমেজ দেওয়া থাকে, তবে সেটি ImgBB-তে আপলোড করা
      if (imageFile) {
        const imgBbFormData = new FormData();
        imgBbFormData.append("image", imageFile);

        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: "POST",
          body: imgBbFormData,
        });
        const imgData = await res.json();

        if (imgData.success) {
          uploadedImageUrl = imgData.data.url;
        } else {
          setError("Failed to upload profile image to ImgBB");
          setLoading(false);
          return;
        }
      }

      const { error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        image: uploadedImageUrl || undefined,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Sign up failed");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-8">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold text-amber-500">
            SalonZen
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Create your customer account to book salon services
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your full name"
                className="bg-zinc-800 border-zinc-700 text-zinc-100 focus-visible:ring-amber-500"
              />
            </div>

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
              <p className="text-xs text-zinc-500">
                Min 6 chars, at least 1 uppercase & 1 lowercase letter
              </p>
            </div>

            {/* Profile Image Upload & Square Preview Box */}
            <div className="space-y-2">
              <Label className="text-zinc-300">Profile Image</Label>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-800/50 flex items-center justify-center overflow-hidden shrink-0">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Upload className="w-6 h-6 text-zinc-500" />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-zinc-800 border-zinc-700 text-zinc-300 file:bg-amber-500 file:px-2 file:text-zinc-950 file:border-0 file:rounded-md file:text-xs file:font-semibold cursor-pointer text-xs"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">
                    PNG, JPG, WEBP (Max 2MB)
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold mt-2"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-amber-500 hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;