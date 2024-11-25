import { ProjectPlateausBaseInsertDto } from '../dtos/projects-plateaus.dto'
import { ProjectPlateaus } from '../entities/project-plateau.entity'
import { InvalidProjectPlateausGeometriesException } from '../exceptions/invalid-project-plateaus-geometries.exception'
import { UnableRetrieveProjectPlateausException } from '../exceptions/unable-retrieve-project-plateaus.exception'
import { UnableUpdateProjectPlateausException } from '../exceptions/unable-update-project-plateaus.exception'
import { FeatureCollection } from '../objects/feature-collection.object'
import { ProjectsPlateausRepository } from '../repositories/projects-plateaus.repository'
import {
  arePolygonsValid,
  fixWindingOrder,
  fixPolygonsClosure,
  fixSelfIntersections,
  removeDuplicateCoordinates,
  removeSmallPolygons,
} from '../utils/geometries.util'

export class ProjectsPlateausService {
  private projectPlateausRepository: ProjectsPlateausRepository

  constructor(projectRepository: ProjectsPlateausRepository) {
    this.projectPlateausRepository = projectRepository
  }

  public async updatePlateaus(projectId: string, data: ProjectPlateausBaseInsertDto): Promise<ProjectPlateaus> {
    let projectPlateaus

    try {
      data.geometries = this.prepareFeatureCollection(data.geometries)
    } catch (error) {
      throw new InvalidProjectPlateausGeometriesException()
    }

    try {
      projectPlateaus = await this.projectPlateausRepository.replaceByProjectId(projectId, data)
    } catch (error) {
      throw new UnableUpdateProjectPlateausException()
    }

    return projectPlateaus
  }

  public async getPlateaus(projectId: string): Promise<ProjectPlateaus> {
    let projectPlateaus

    try {
      projectPlateaus = await this.projectPlateausRepository.getByProjectId(projectId)
    } catch (error) {
      throw new UnableRetrieveProjectPlateausException()
    }

    return projectPlateaus
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
