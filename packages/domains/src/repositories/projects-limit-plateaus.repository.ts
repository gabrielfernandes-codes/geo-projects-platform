import { eq, projectsLimitPlateausTable } from '@platform/neon'

import { feature as createFeature, featureCollection as createFeatureCollection } from '@turf/turf'
import { ProjectLimitPlateaus, projectLimitPlateauSelect } from '../entities/project-limit-plateau.entity'
import { AbstractRepository } from './abstract.repository'

export class ProjectsLimitPlateausRepository extends AbstractRepository {
  public async getByProjectId(projectId: string): Promise<ProjectLimitPlateaus> {
    const records = await this.entityManager
      .select(projectLimitPlateauSelect)
      .from(projectsLimitPlateausTable)
      .where(eq(projectsLimitPlateausTable.projectId, projectId))

    return {
      geometries: createFeatureCollection(
        records.map((record) => createFeature(record.geometry, record.properties || {}))
      ),
    }
  }
}
