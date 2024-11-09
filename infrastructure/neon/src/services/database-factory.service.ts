import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

export class DatabaseFactory {
  private static instances: Map<string, ReturnType<typeof drizzle>> = new Map()

  public static createConnection(dsn: string): ReturnType<typeof drizzle> {
    if (this.instances.has(dsn)) {
      return this.instances.get(dsn)!
    }

    const client = neon(dsn)
    const instance = drizzle({ client })

    this.instances.set(dsn, instance)

    return instance
  }
}
