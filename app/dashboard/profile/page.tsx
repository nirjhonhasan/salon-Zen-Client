import CustomerNoticeBoard from "@/app/Components/dashboard/CustomerNoticeBoard"
import ProfileCard from "@/app/Components/dashboard/ProfileCard"
import ProfileForm from "@/app/Components/ProfileForm"
import { requireUser } from "@/lib/session"

export default async function ProfilePage() {
  const user = await requireUser()
  const isCustomer = (user.role || "customer") === "customer"

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
          Account
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-heading)] text-4xl font-semibold text-white">
          My Profile
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: profile card */}
        <ProfileCard user={user} />

        {/* Right: edit form, and the notice board for customers */}
        <div className="space-y-6 lg:col-span-2">
          <ProfileForm user={user} />
          {isCustomer && <CustomerNoticeBoard />}
        </div>
      </div>
    </div>
  )
}
