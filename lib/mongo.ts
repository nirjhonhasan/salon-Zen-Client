import { MongoClient } from "mongodb"
import { attachDatabasePool } from "@vercel/functions"

// One MongoDB connection for the whole app (server side only).
// Both BetterAuth and our pages import this same connection.
//
// Why we connect up front: if the first connection attempt fails while several
// queries are waiting on it (BetterAuth creates indexes on start), the driver
// closes the client for good and every later query fails with
// "MongoTopologyClosedError". So we connect once, with retries, before anyone
// can use the client. A failed attempt is thrown away and replaced by a new one.
const CONNECT_ATTEMPTS = 3

function newClient() {
  return new MongoClient(process.env.BETTER_DB_URI as string, {
    maxPoolSize: 5,
    maxIdleTimeMS: 30000,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  })
}

async function connectWithRetry(): Promise<MongoClient> {
  let lastError: unknown

  for (let attempt = 1; attempt <= CONNECT_ATTEMPTS; attempt++) {
    const mongoClient = newClient()

    try {
      await mongoClient.connect()
      attachDatabasePool(mongoClient)
      return mongoClient
    } catch (error) {
      lastError = error
      console.error(
        `MongoDB connect attempt ${attempt}/${CONNECT_ATTEMPTS} failed:`,
        error instanceof Error ? error.message : error
      )
      await mongoClient.close().catch(() => {})
    }
  }

  // This instance cannot reach the database. Exit so Vercel starts a fresh
  // instance for the next request instead of reusing a broken one.
  if (process.env.VERCEL) {
    setTimeout(() => process.exit(1), 500)
  }

  throw lastError
}

const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient }

// During "next build" there is nothing to connect to, so only create the client.
const isBuild = process.env.NEXT_PHASE === "phase-production-build"

export const client: MongoClient =
  globalForMongo._mongoClient ??
  (isBuild ? newClient() : await connectWithRetry())

globalForMongo._mongoClient = client

export const db = client.db("salon-zen")
