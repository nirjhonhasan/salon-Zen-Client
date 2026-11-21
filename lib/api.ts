// Small helper for calling the Express server from client components.
// It gets a login token first, then sends it in the Authorization header.
import GetTokenForClient from "./GetTokenForClient"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export async function callServer(
  path: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: object
) {
  // 1. Get a BetterAuth JWT for the logged-in user (Express checks it with JWKS).
  const token = await GetTokenForClient()

  if (!token) {
    throw new Error("Please sign in again.")
  }

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
    throw new Error(data.message || data.error || "Something went wrong.")
  }

  return data
}
