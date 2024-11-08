import { DatabaseFactory } from '@platform/neon'

export class DatabaseManager {
  private connection: ReturnType<typeof DatabaseFactory.createConnection>

  constructor(dsn: string) {
    this.connection = DatabaseFactory.createConnection(dsn)
  }

  public getInstances(): ReturnType<typeof DatabaseFactory.createConnection> {
    return this.connection
  }
}
