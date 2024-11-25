import { ProjectLimitPlateausBaseInsertDto } from '../dtos/projects-limit-plateaus.dto'
import { ProjectLimitPlateaus } from '../entities/project-limit-plateau.entity'
import { InvalidProjectLimitPlateausGeometriesBoundariesException } from '../exceptions/invalid-project-limit-plateaus-geometries-boundaries.exception'
import { InvalidProjectPlateausGeometriesException } from '../exceptions/invalid-project-plateaus-geometries.exception'
import { UnableRetrieveProjectLimitPlateausException } from '../exceptions/unable-retrieve-project-limit-plateaus.exception'
import { UnableUpdateProjectLimitPlateausException } from '../exceptions/unable-update-project-limit-plateaus.exception'
import { FeatureCollection } from '../objects/feature-collection.object'
import { ProjectsLimitPlateausRepository } from '../repositories/projects-limit-plateaus.repository'
import {
  arePolygonsValid,
  fixPolygonsClosure,
  fixSelfIntersections,
  fixWindingOrder,
  removeDuplicateCoordinates,
  removeSmallPolygons,
} from '../utils/geometries.util'

export class ProjectsLimitPlateausService {
  private projectLimitPlateausRepository: ProjectsLimitPlateausRepository

  constructor(projectLimitPlateausRepository: ProjectsLimitPlateausRepository) {
    this.projectLimitPlateausRepository = projectLimitPlateausRepository
  }

  public async updatePlateaus(
    projectId: string,
    data: ProjectLimitPlateausBaseInsertDto
  ): Promise<ProjectLimitPlateaus> {
    let projectLimitPlateaus

    try {
      data.geometries = this.prepareGeometries(data.geometries)
    } catch (error) {
      throw new InvalidProjectPlateausGeometriesException()
    }

    try {
      projectLimitPlateaus = await this.projectLimitPlateausRepository.replaceByProjectId(projectId, data)
    } catch (error) {
      if (error instanceof RangeError) {
        throw new InvalidProjectLimitPlateausGeometriesBoundariesException()
      }

      throw new UnableUpdateProjectLimitPlateausException()
    }

    return projectLimitPlateaus
  }

  public async getPlateaus(projectId: string): Promise<ProjectLimitPlateaus> {
    let projectLimitPlateaus

    try {
      projectLimitPlateaus = await this.projectLimitPlateausRepository.getByProjectId(projectId)
    } catch (error) {
      throw new UnableRetrieveProjectLimitPlateausException()
    }

    return projectLimitPlateaus
  }

  private prepareGeometries(featureCollection: FeatureCollection): FeatureCollection {
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
