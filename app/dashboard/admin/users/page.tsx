import { requireRole } from "@/lib/session"
import { getAllUsers, type AdminUser } from "@/lib/users"
import UserActions from "@/app/Components/dashboard/UserActions"

// Always show the newest data from the database.
export const dynamic = "force-dynamic"

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString("en-GB") : "-"
}

export default async function AdminUsersPage() {
  // Only a logged-in admin can open this page.
  const admin = await requireRole("admin")

  let users: AdminUser[] = []
  let loadError = false

  try {
    users = await getAllUsers()
  } catch (error) {
    console.error("Could not load users:", error)
    loadError = true
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
          Admin / Users
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Manage Users
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Block or unblock customers, or give a user admin access.
        </p>
      </div>

      {loadError ? (
        <p className="rounded-2xl border border-dashed border-red-500/30 p-10 text-center text-sm text-red-400">
          We could not load the users. Please refresh the page.
        </p>
      ) : users.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-sm text-zinc-400">
          No users yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-800 text-xs text-zinc-400 uppercase">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-zinc-800 last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.image}
                          alt={user.name}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-amber-500">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <span className="font-medium text-white">
                        {user.name}
                        {user.id === admin.id && (
                          <span className="ml-2 text-xs text-zinc-500">
                            (you)
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        user.role === "admin"
                          ? "rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-500"
                          : "rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300"
                      }
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        user.isBlocked
                          ? "rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400"
                          : "rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400"
                      }
                    >
                      {user.isBlocked ? "blocked" : "active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    {user.id === admin.id ? (
                      <span className="text-xs text-zinc-500">No actions</span>
                    ) : (
                      <UserActions
                        id={user.id}
                        name={user.name}
                        role={user.role}
                        isBlocked={user.isBlocked}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
