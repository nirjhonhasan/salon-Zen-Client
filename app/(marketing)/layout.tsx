import type { ReactNode } from "react"
import Navbar from "@/app/Components/Home/Navbar"
import Footer from "@/app/Components/Home/Footer"

// Public pages (home, services, ...) get the site navbar and footer.
// The dashboard and auth pages have their own layouts.
export default function MarketingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-zinc-950">{children}</main>
      <Footer />
    </>
  )
}
