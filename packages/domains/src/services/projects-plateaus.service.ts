import { ProjectPlateausBaseInsertDto } from '../dtos/projects-plateaus.dto'
import { ProjectPlateaus } from '../entities/project-plateau.entity'
import { UnableRetrieveProjectPlateauException } from '../exceptions/unable-retrieve-project-plateau.exception'
import { UnableUpdateProjectPlateauException } from '../exceptions/unable-update-project-plateau.exception'
import { ProjectsPlateausRepository } from '../repositories/projects-plateaus.repository'

export class ProjectsPlateausService {
  private projectPlateausRepository: ProjectsPlateausRepository

  constructor(projectRepository: ProjectsPlateausRepository) {
    this.projectPlateausRepository = projectRepository
  }

  public async updatePlateaus(projectId: string, data: ProjectPlateausBaseInsertDto): Promise<ProjectPlateaus> {
    let projectPlateaus

    try {
      projectPlateaus = await this.projectPlateausRepository.replaceByProjectId(projectId, data)
    } catch (error) {
      throw new UnableUpdateProjectPlateauException()
    }

    return projectPlateaus
  }

  public async getPlateaus(projectId: string): Promise<ProjectPlateaus> {
    let projectPlateaus

    try {
      projectPlateaus = await this.projectPlateausRepository.getByProjectId(projectId)
    } catch (error) {
      throw new UnableRetrieveProjectPlateauException()
    }

    return projectPlateaus
  }
}
