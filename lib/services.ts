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

// Options for getActiveServices. All of them are optional.
type ServiceFilters = {
  limit?: number // only the newest few (used by the home page)
  search?: string // part of the service name
  category?: string // exact category name
  sort?: string // "price-asc" or "price-desc"
}

// Read the active services from MongoDB.
// This runs on the server only (it is called from a server component).
export async function getActiveServices(
  filters: ServiceFilters = {}
): Promise<Service[]> {
  // Start with the rule every visitor must see: active services only.
  const query: Record<string, unknown> = { status: "active" }

  // Search by name (not case sensitive).
  if (filters.search) {
    // Escape special characters so "C++" cannot break the search.
    const safeText = filters.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    query.serviceName = { $regex: safeText, $options: "i" }
  }

  // Filter by category.
  if (filters.category) {
    query.category = filters.category
  }

  // Sort by price: 1 = low to high, -1 = high to low. Default = newest first.
  let sortBy: Record<string, 1 | -1> = { createdAt: -1 }
  if (filters.sort === "price-asc") sortBy = { price: 1 }
  if (filters.sort === "price-desc") sortBy = { price: -1 }

  const documents = await db
    .collection("services")
    .find(query)
    .sort(sortBy)
    .limit(filters.limit ?? 0)
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
export async function getServiceById( id: string ): Promise<(Service & { status: string }) | null> {
  
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
