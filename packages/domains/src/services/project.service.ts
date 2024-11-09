import { Project } from '../entities/project.entity'
import { ProjectNotFoundException } from '../exceptions/project-not-found.exception'
import { ProjectRepository } from '../repositories/project.repository'

export class ProjectService {
  private projectRepository: ProjectRepository

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository
  }

  public async createProject(data: { name: string }): Promise<Project> {
    const project = await this.projectRepository.insertProject(data)

    return project
  }

  public async getProject(id: string): Promise<Project> {
    const project = await this.projectRepository.findProject(id)

    if (!project) {
      throw new ProjectNotFoundException()
    }

    return project
  }
}
