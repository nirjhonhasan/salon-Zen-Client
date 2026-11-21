import { getTokenForServer } from "./GetTokenForSer"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// One appointment of the logged-in customer, as the My Appointments page needs it.
export type MyAppointment = {
  id: string
  serviceId: string
  serviceName: string
  serviceImage: string
  appointmentDate: string
  timeSlot: string
  message: string
  servicePrice: number
  status: string
  paymentStatus: string
  createdAt: string | null
}

type ApiAppointment = {
  _id: string
  serviceId: string
  serviceName?: string
  serviceImage?: string
  appointmentDate: string
  timeSlot: string
  message?: string
  servicePrice: number | string
  status?: string
  paymentStatus?: string
  createdAt?: string
}

// The server sends back only this customer's own appointments.
export async function getMyAppointments(): Promise<MyAppointment[]> {
  const token = await getTokenForServer()

  const response = await fetch(`${API_URL}/appointments/my`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error("Server returned " + response.status)
  }

  const data: ApiAppointment[] = await response.json()

  return data.map((item) => ({
    id: item._id,
    serviceId: item.serviceId,
    serviceName: item.serviceName ?? "Service removed",
    serviceImage: item.serviceImage ?? "",
    appointmentDate: item.appointmentDate,
    timeSlot: item.timeSlot,
    message: item.message ?? "",
    servicePrice: Number(item.servicePrice),
    status: item.status ?? "pending",
    paymentStatus: item.paymentStatus ?? "unpaid",
    createdAt: item.createdAt ?? null,
  }))
}

// One appointment as the admin sees it, with customer and service details.
export type AdminAppointment = MyAppointment & {
  serviceCategory: string
  customerName: string
  customerEmail: string
  customerImage: string
}

type ApiAdminAppointment = ApiAppointment & {
  serviceCategory?: string
  customerName?: string
  customerEmail?: string
  customerImage?: string
}

// Admin only: the server checks the token and the admin role.
export async function getAllAppointments(): Promise<AdminAppointment[]> {
  const token = await getTokenForServer()

  const response = await fetch(`${API_URL}/appointments`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error("Server returned " + response.status)
  }

  const data: ApiAdminAppointment[] = await response.json()

  return data.map((item) => ({
    id: item._id,
    serviceId: item.serviceId,
    serviceName: item.serviceName ?? "Service removed",
    serviceImage: item.serviceImage ?? "",
    serviceCategory: item.serviceCategory ?? "",
    appointmentDate: item.appointmentDate,
    timeSlot: item.timeSlot,
    message: item.message ?? "",
    servicePrice: Number(item.servicePrice),
    status: item.status ?? "pending",
    paymentStatus: item.paymentStatus ?? "unpaid",
    createdAt: item.createdAt ?? null,
    customerName: item.customerName ?? "User removed",
    customerEmail: item.customerEmail ?? "",
    customerImage: item.customerImage ?? "",
  }))
}
