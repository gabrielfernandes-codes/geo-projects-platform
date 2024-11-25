import { booleanContains, booleanOverlap, featureCollection as createFeatureCollection, intersect } from '@turf/turf'

import { ProjectPlateausBaseInsertDto } from '../dtos/projects-plateaus.dto'
import { ProjectPlateaus } from '../entities/project-plateau.entity'
import { InvalidProjectPlateausGeometriesExceptionBoundaries } from '../exceptions/invalid-project-plateaus-geometriers-bounderies.exception'
import { InvalidProjectPlateausGeometriesException } from '../exceptions/invalid-project-plateaus-geometries.exception'
import { UnableRetrieveProjectPlateausException } from '../exceptions/unable-retrieve-project-plateaus.exception'
import { UnableUpdateProjectPlateausException } from '../exceptions/unable-update-project-plateaus.exception'
import { FeatureCollection } from '../objects/feature-collection.object'
import { Feature } from '../objects/feature.object'
import { ProjectsLimitsRepository } from '../repositories/projects-limits.repository'
import { ProjectsPlateausRepository } from '../repositories/projects-plateaus.repository'
import {
  arePolygonsValid,
  fixPolygonsClosure,
  fixSelfIntersections,
  fixWindingOrder,
  removeDuplicateCoordinates,
  removeSmallPolygons,
} from '../utils/geometries.util'

export class ProjectsPlateausService {
  private projectPlateausRepository: ProjectsPlateausRepository

  private projectLimitsRepository: ProjectsLimitsRepository

  constructor(
    projectPlateausRepository: ProjectsPlateausRepository,
    projectLimitsRepository: ProjectsLimitsRepository
  ) {
    this.projectPlateausRepository = projectPlateausRepository
    this.projectLimitsRepository = projectLimitsRepository
  }

  public async updatePlateaus(projectId: string, data: ProjectPlateausBaseInsertDto): Promise<ProjectPlateaus> {
    let projectPlateaus
    let projectLimits

    try {
      data.geometries = this.prepareGeometries(data.geometries)
    } catch (error) {
      throw new InvalidProjectPlateausGeometriesException()
    }

    try {
      projectLimits = await this.projectLimitsRepository.getByProjectId(projectId)
    } catch (error) {
      throw new UnableRetrieveProjectPlateausException()
    }

    let hasIntersection = false

    const intersectedFeatures: Feature[] = []

    projectLimits.geometries.features.forEach((limitFeature) => {
      data.geometries.features.forEach((plateauFeature) => {
        if (
          booleanContains(limitFeature, plateauFeature) ||
          booleanContains(plateauFeature, limitFeature) ||
          booleanOverlap(limitFeature, plateauFeature)
        ) {
          hasIntersection = true

          const intersectedFeature = intersect(createFeatureCollection([limitFeature, plateauFeature])) as Feature

          if (intersectedFeature) {
            intersectedFeatures.push(intersectedFeature)
          }
        }
      })
    })

    if (!hasIntersection) {
      throw new InvalidProjectPlateausGeometriesExceptionBoundaries()
    }

    data.geometries = createFeatureCollection(intersectedFeatures)

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
