import { db } from "@/lib/mongo"

// One service as the UI needs it.
export type Service = {
  id: string
  serviceName: string
  category: string
  description: string
  price: number
  duration: number
  image: string
}

// Admin list: every service, active and inactive.
export async function getAllServices(): Promise<
  (Service & { status: string })[]
> {
  const documents = await db
    .collection("services")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return documents.map((document) => ({
    id: document._id.toString(),
    serviceName: document.serviceName,
    category: document.category,
    description: document.description,
    price: document.price,
    duration: document.duration,
    image: document.image,
    status: document.status,
  }))
}

// Read the active services from MongoDB.
// This runs on the server only (it is called from a server component).
// Pass a limit to get only the newest few (used by the home page).
export async function getActiveServices(limit = 0): Promise<Service[]> {
  const documents = await db
    .collection("services")
    .find({ status: "active" })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray()

  // Convert MongoDB's _id into a normal string id for React keys.
  return documents.map((document) => ({
    id: document._id.toString(),
    serviceName: document.serviceName,
    category: document.category,
    description: document.description,
    price: document.price,
    duration: document.duration,
    image: document.image,
  }))
}

// Get one service from the Express server by its id.
// Returns null when the id is invalid or the service does not exist.
// Throws when the server cannot be reached.
export async function getServiceById(
  id: string
): Promise<(Service & { status: string }) | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

  const response = await fetch(`${apiUrl}/services/${id}`, {
    cache: "no-store",
  })

  // 400 = bad id, 404 = no service with this id
  if (response.status === 400 || response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error("Server returned " + response.status)
  }

  const data = await response.json()

  return {
    id: data._id,
    serviceName: data.serviceName,
    category: data.category,
    description: data.description,
    price: data.price,
    duration: data.duration,
    image: data.image,
    status: data.status,
  }
}
