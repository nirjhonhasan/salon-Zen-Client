import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import Navbar from "@/app/Components/Home/Navbar"
import Footer from "@/app/Components/Home/Footer"

// Sign-in and sign-up should not be visible to someone who is already logged in.
// They use the same navbar and footer as the public pages.
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (user) {
    redirect(user.role === "admin" ? "/dashboard/admin" : "/dashboard/customer")
  }

  return (
    <>
      <Navbar />
      <main className="bg-zinc-950">{children}</main>
      <Footer />
    </>
  )
}
