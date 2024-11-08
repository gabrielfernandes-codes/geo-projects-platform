import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

export class DatabaseFactory {
  private static instances: Map<string, ReturnType<typeof drizzle>> = new Map()

  public static createConnection(connectionString: string): ReturnType<typeof drizzle> {
    if (!this.instances.has(connectionString)) {
      const sqlClient = neon(connectionString)
      const dbInstance = drizzle({ client: sqlClient })

      this.instances.set(connectionString, dbInstance)
    }

    return this.instances.get(connectionString)!
  }
}
