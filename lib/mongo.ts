import { MongoClient } from "mongodb"
import { attachDatabasePool } from "@vercel/functions"

// One MongoDB connection for the whole app (server side only).
// Both BetterAuth and our pages import this same connection.
//
// The client is cached on globalThis so a warm serverless instance (and dev
// hot reloads) reuse one pool instead of reconnecting on every request.
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient }

function createClient() {
  const mongoClient = new MongoClient(process.env.BETTER_DB_URI as string, {
    maxPoolSize: 5,
    maxIdleTimeMS: 30000,
    // Fail fast instead of hanging for the 30s default when Atlas is
    // unreachable (for example the IP allow list blocks Vercel).
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  })

  attachDatabasePool(mongoClient)
  return mongoClient
}

export const client = globalForMongo._mongoClient ?? createClient()

globalForMongo._mongoClient = client

export const db = client.db("salon-zen")
