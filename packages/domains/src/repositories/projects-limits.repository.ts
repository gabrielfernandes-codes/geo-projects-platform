import { eq, projectsLimitsTable, sql } from '@platform/neon'

import { feature as createFeature, featureCollection as createFeatureCollection } from '@turf/turf'
import { ProjectLimitsBaseInsertDto } from '../dtos/projects-limits.dto'
import { ProjectLimits, projectLimitSelect } from '../entities/project-limit.entity'
import { AbstractRepository } from './abstract.repository'

export class ProjectsLimitsRepository extends AbstractRepository {
  public async replaceByProjectId(projectId: string, data: ProjectLimitsBaseInsertDto): Promise<ProjectLimits> {
    const projectLimits = await this.entityManager.transaction(async (trx) => {
      await trx.execute(
        sql`SELECT 1 FROM ${projectsLimitsTable} WHERE ${projectsLimitsTable.projectId} = ${projectId} FOR UPDATE`
      )

      await trx.delete(projectsLimitsTable).where(eq(projectsLimitsTable.projectId, projectId))

      for (const feature of data.geometries.features) {
        const geometryStringified = JSON.stringify(feature.geometry)

        await trx.insert(projectsLimitsTable).values({
          projectId,
          geometry: sql`ST_SetSRID(ST_GeomFromGeoJSON(${geometryStringified}), 4326)::geography`,
          properties: feature.properties,
        })
      }

      const records = await trx
        .select(projectLimitSelect)
        .from(projectsLimitsTable)
        .where(eq(projectsLimitsTable.projectId, projectId))

      return {
        geometries: createFeatureCollection(
          records.map((record) => createFeature(record.geometry, record.properties || {}))
        ),
      }
    })

    return projectLimits as ProjectLimits
  }

  public async getByProjectId(projectId: string): Promise<ProjectLimits> {
    const records = await this.entityManager
      .select(projectLimitSelect)
      .from(projectsLimitsTable)
      .where(eq(projectsLimitsTable.projectId, projectId))

    return {
      geometries: createFeatureCollection(
        records.map((record) => createFeature(record.geometry, record.properties || {}))
      ),
    }
  }
}
