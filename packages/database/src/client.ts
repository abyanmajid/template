import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const initDBClient = (connectionString: string) => {
  const client = postgres(connectionString)
  return drizzle(client)
}
