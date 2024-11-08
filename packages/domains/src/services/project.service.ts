import { ProjectRepository } from '../repositories/project.repository'

export class ProjectService {
  private projectRepository: ProjectRepository

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository
  }

  public createProject() {
    const project = this.projectRepository.storeProject()

    return project
  }

  public getProject() {
    const project = this.projectRepository.findProject()

    return project
  }
}
