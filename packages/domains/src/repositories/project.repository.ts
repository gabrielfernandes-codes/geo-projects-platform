import { completeProjectMock } from '../mocks/project.mock'
import { AbstractRepository } from './abstract.repository'

export class ProjectRepository extends AbstractRepository {
  public storeProject() {
    return completeProjectMock
  }

  public findProject() {
    return completeProjectMock
  }
}
