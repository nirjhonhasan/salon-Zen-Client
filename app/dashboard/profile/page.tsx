import { requireUser } from "@/lib/session"
import ProfileForm from "@/app/Components/ProfileForm"

export default async function ProfilePage() {
  const user = await requireUser()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Update your name and profile picture. These details appear in the
          navbar.
        </p>
      </div>

      <ProfileForm user={user} />
    </div>
  )
}
