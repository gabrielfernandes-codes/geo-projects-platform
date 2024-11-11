import { ProjectBaseInsertDto } from '../dtos/project.dto'
import { Project } from '../entities/project.entity'
import { ProjectNotFoundException } from '../exceptions/project-not-found.exception'
import { UnableCreateProjectException } from '../exceptions/unable-create-project.exception'
import { UnableRetrieveProjectException } from '../exceptions/unable-retrieve-project.exception'
import { ProjectsRepository } from '../repositories/projects.repository'

export class ProjectsService {
  private projectRepository: ProjectsRepository

  constructor(projectRepository: ProjectsRepository) {
    this.projectRepository = projectRepository
  }

  public async createProject(data: ProjectBaseInsertDto): Promise<Project> {
    let project

    try {
      project = await this.projectRepository.insert(data)
    } catch (error) {
      throw new UnableCreateProjectException()
    }

    return project
  }

  public async hasProject(id: string): Promise<true> {
    let hasFound

    try {
      hasFound = await this.projectRepository.exists(id)
    } catch (error) {
      throw new UnableRetrieveProjectException()
    }

    if (!hasFound) {
      throw new ProjectNotFoundException()
    }

    return true
  }

  public async getProject(id: string): Promise<Project> {
    let project

    try {
      project = await this.projectRepository.find(id)
    } catch (error) {
      throw new UnableRetrieveProjectException()
    }

    if (!project) {
      throw new ProjectNotFoundException()
    }

    return project
  }
}
