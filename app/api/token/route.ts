import jwt from "jsonwebtoken"
import { getCurrentUser } from "@/lib/session"

// Gives the logged-in user a short-lived token.
// The browser sends this token to the Express server, which checks it.
export async function GET() {
  const user = await getCurrentUser()

  if (!user) {
    return Response.json({ message: "Please sign in first" }, { status: 401 })
  }

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  })

  return Response.json({ token })
}
