import GetTokenForClient from "./GetTokenForClient"


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export async function callServer(
  path: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: object
) {

  const token = await GetTokenForClient()

  if (!token) {
    throw new Error("Please sign in again.")
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.error || "Something went wrong.")
  }

  return data
}
