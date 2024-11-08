import { DatabaseManager } from '../infrastructure/database-manager.infrastructure'

export abstract class AbstractRepository {
  protected entityManager: ReturnType<DatabaseManager['getInstances']>

  constructor(databaseManager: DatabaseManager) {
    this.entityManager = databaseManager.getInstances()
  }
}
