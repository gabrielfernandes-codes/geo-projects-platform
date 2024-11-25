import { ProjectLimitsBaseInsertDto } from '../dtos/projects-limits.dto'
import { ProjectLimits } from '../entities/project-limit.entity'
import { InvalidProjectLimitsGeometriesException } from '../exceptions/invalid-project-limits-geometries.exception'
import { UnableRetrieveProjectLimitsException } from '../exceptions/unable-retrieve-project-limits.exception'
import { UnableUpdateProjectLimitsException } from '../exceptions/unable-update-project-limits.exception'
import { FeatureCollection } from '../objects/feature-collection.object'
import { ProjectsLimitsRepository } from '../repositories/projects-limits.repository'
import {
  arePolygonsValid,
  fixWindingOrder,
  fixPolygonsClosure,
  fixSelfIntersections,
  removeDuplicateCoordinates,
  removeSmallPolygons,
} from '../utils/geometries.util'

export class ProjectsLimitsService {
  private projectLimitsRepository: ProjectsLimitsRepository

  constructor(projectRepository: ProjectsLimitsRepository) {
    this.projectLimitsRepository = projectRepository
  }

  public async updateLimits(projectId: string, data: ProjectLimitsBaseInsertDto): Promise<ProjectLimits> {
    let projectLimits

    try {
      data.geometries = this.prepareFeatureCollection(data.geometries)
    } catch (error) {
      throw new InvalidProjectLimitsGeometriesException()
    }

    try {
      projectLimits = await this.projectLimitsRepository.replaceByProjectId(projectId, data)
    } catch (error) {
      throw new UnableUpdateProjectLimitsException()
    }

    return projectLimits
  }

  public async getLimits(projectId: string): Promise<ProjectLimits> {
    let projectLimits

    try {
      projectLimits = await this.projectLimitsRepository.getByProjectId(projectId)
    } catch (error) {
      throw new UnableRetrieveProjectLimitsException()
    }

    return projectLimits
  }

  private prepareFeatureCollection(featureCollection: FeatureCollection): FeatureCollection {
    if (!arePolygonsValid(featureCollection)) {
      featureCollection = fixPolygonsClosure(featureCollection)
    }

    featureCollection = removeDuplicateCoordinates(featureCollection)
    featureCollection = fixSelfIntersections(featureCollection)
    featureCollection = removeSmallPolygons(featureCollection)

    if (!arePolygonsValid(featureCollection)) {
      throw new Error('Invalid polygons')
    }

    featureCollection = fixWindingOrder(featureCollection)

    return featureCollection
  }
}
