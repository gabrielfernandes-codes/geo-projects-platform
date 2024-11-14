import { ProjectLimitsBaseInsertDto } from '../dtos/projects-limits.dto'
import { ProjectLimits } from '../entities/project-limit.entity'
import { UnableRetrieveProjectLimitException } from '../exceptions/unable-retrieve-project-limit.exception'
import { UnableUpdateProjectLimitException } from '../exceptions/unable-update-project-limit.exception'
import { ProjectsLimitsRepository } from '../repositories/projects-limits.repository'

export class ProjectsLimitsService {
  private projectLimitsRepository: ProjectsLimitsRepository

  constructor(projectRepository: ProjectsLimitsRepository) {
    this.projectLimitsRepository = projectRepository
  }

  public async updateLimits(projectId: string, data: ProjectLimitsBaseInsertDto): Promise<ProjectLimits> {
    let projectLimits

    try {
      projectLimits = await this.projectLimitsRepository.replaceByProjectId(projectId, data)
    } catch (error) {
      throw new UnableUpdateProjectLimitException()
    }

    return projectLimits
  }

  public async getLimits(projectId: string): Promise<ProjectLimits> {
    let projectLimits

    try {
      projectLimits = await this.projectLimitsRepository.getByProjectId(projectId)
    } catch (error) {
      throw new UnableRetrieveProjectLimitException()
    }

    return projectLimits
  }
}
