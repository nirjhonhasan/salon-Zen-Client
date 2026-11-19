// The user object we pass around in the UI.
// It matches what BetterAuth returns from the session.
export type SessionUser = {
  id: string
  name: string
  email: string
  image?: string | null
  role?: string | null
  isBlocked?: boolean | null
}
