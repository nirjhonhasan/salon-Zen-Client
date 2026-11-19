// Small helper for calling the Express server from client components.
// It gets a login token first, then sends it in the Authorization header.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export async function callServer(
  path: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  body?: object
) {
  // 1. Ask our own Next.js route for a token (works only when logged in).
  const tokenResponse = await fetch("/api/token")

  if (!tokenResponse.ok) {
    throw new Error("Please sign in again.")
  }

  const { token } = await tokenResponse.json()

  // 2. Call the Express server with the token.
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  // 3. If the server says no, turn its message into an error.
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.")
  }

  return data
}
