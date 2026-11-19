import { db } from "@/lib/mongo"

// Count things in the database for the admin overview.
// countDocuments(filter) returns how many documents match the filter.
export async function getAdminStats() {
  const [
    customers,
    activeServices,
    appointments,
    pending,
    confirmed,
    payments,
  ] = await Promise.all([
    // Customers = users whose role is "customer"
    db.collection("user").countDocuments({ role: "customer" }),
    db.collection("services").countDocuments({ status: "active" }),
    // No filter = count every appointment
    db.collection("appointments").countDocuments({}),
    db.collection("appointments").countDocuments({ status: "pending" }),
    db.collection("appointments").countDocuments({ status: "confirmed" }),
    // Only payments that succeeded
    db.collection("transactions").countDocuments({ status: "paid" }),
  ])

  return {
    customers,
    activeServices,
    appointments,
    pending,
    confirmed,
    payments,
  }
}
