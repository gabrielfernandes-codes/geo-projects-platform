import { ProjectLimitPlateaus } from '../entities/project-limit-plateau.entity'
import { UnableRetrieveProjectLimitPlateausException } from '../exceptions/unable-retrieve-project-limit-plateaus.exception'
import { ProjectsLimitPlateausRepository } from '../repositories/projects-limit-plateaus.repository'

export class ProjectsLimitPlateausService {
  private projectLimitPlateausRepository: ProjectsLimitPlateausRepository

  constructor(projectLimitPlateausRepository: ProjectsLimitPlateausRepository) {
    this.projectLimitPlateausRepository = projectLimitPlateausRepository
  }

  public async getLimitPlateaus(projectId: string): Promise<ProjectLimitPlateaus> {
    let projectPlateaus

    try {
      projectPlateaus = await this.projectLimitPlateausRepository.getByProjectId(projectId)
    } catch (error) {
      throw new UnableRetrieveProjectLimitPlateausException()
    }

    return projectPlateaus
  }
}
