import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

export class DatabaseFactory {
  private static instances: Map<string, ReturnType<typeof drizzle>> = new Map()

  public static createConnection(dsn: string): ReturnType<typeof drizzle> {
    if (this.instances.has(dsn)) {
      return this.instances.get(dsn)!
    }

    const pool = new Pool({
      connectionString: dsn,
    })
    const instance = drizzle({ client: pool })

    this.instances.set(dsn, instance)

    return instance
  }
}
