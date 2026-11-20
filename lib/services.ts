import { getTokenForServer } from "./GetTokenForSer"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

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


export type ServiceWithStatus = Service & { status: string }


type ApiService = {
  _id: string
  serviceName: string
  category: string
  description: string
  price: number | string
  duration: number | string
  image: string
  status?: string
}

// Turn the server's shape into the shape the UI uses (_id becomes id).
function toService(item: ApiService): ServiceWithStatus {
  return {
    id: item._id,
    serviceName: item.serviceName,
    category: item.category,
    description: item.description,
    price: Number(item.price),
    duration: Number(item.duration),
    image: item.image,
    status: item.status ?? "active",
  }
}



async function fetchAllServices(): Promise<ServiceWithStatus[]> {
  const response = await fetch(`${API_URL}/services`, { cache: "no-store" })

  if (!response.ok) {
    throw new Error("Server returned " + response.status)
  }

  const data: ApiService[] = await response.json()
  return data.map(toService)
}

export async function getAllServices(): Promise<ServiceWithStatus[]> {
  return fetchAllServices()
}




type ServiceFilters = {
  limit?: number 
  search?: string 
  category?: string 
  sort?: string
}




export async function getActiveServices(
  filters: ServiceFilters = {}
): Promise<Service[]> {
  const allServices = await fetchAllServices()

  let list = allServices.filter((item) => item.status === "active")

  if (filters.category) {
    list = list.filter((item) => item.category === filters.category)
  }

  if (filters.search) {
    const text = filters.search.toLowerCase()
    list = list.filter((item) => item.serviceName.toLowerCase().includes(text))
  }

  if (filters.sort === "price-asc") {
    list.sort((a, b) => a.price - b.price)
  } else if (filters.sort === "price-desc") {
    list.sort((a, b) => b.price - a.price)
  }

  if (filters.limit) {
    list = list.slice(0, filters.limit)
  }

  return list
} 




export async function getServiceById(
  id: string
): Promise<ServiceWithStatus | null> {
  // This route is protected on the server, so send the login token.
  const token = await getTokenForServer()

  const response = await fetch(`${API_URL}/services/${id}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  })


  if (response.status === 400 || response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error("Server returned " + response.status)
  }

  const data: ApiService = await response.json()
  return toService(data)
}
