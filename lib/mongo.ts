import { MongoClient } from "mongodb"

// One MongoDB connection for the whole app (server side only).
// Both BetterAuth and our pages import this same connection.
export const client = new MongoClient(process.env.BETTER_DB_URI as string)

export const db = client.db("salon-zen")
