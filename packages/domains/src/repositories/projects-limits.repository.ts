import { eq, projectsLimitsTable, sql } from '@platform/neon'

import { ProjectLimitsBaseInsertDto } from '../dtos/projects-limits.dto'
import { ProjectLimits, projectLimitSelect } from '../entities/project-limit.entity'
import { AbstractRepository } from './abstract.repository'
import { featureCollectionSchema } from '../objects/feature-collection.object'

export class ProjectsLimitsRepository extends AbstractRepository {
  public async replaceByProjectId(projectId: string, data: ProjectLimitsBaseInsertDto): Promise<ProjectLimits> {
    const projectLimits = await this.entityManager.transaction(async (trx) => {
      await trx.execute(
        sql`SELECT 1 FROM ${projectsLimitsTable} WHERE ${projectsLimitsTable.projectId} = ${projectId} FOR UPDATE`
      )

      await trx.delete(projectsLimitsTable).where(eq(projectsLimitsTable.projectId, projectId))

      for (const feature of data.collection.features) {
        await trx.insert(projectsLimitsTable).values({
          projectId,
          polygon: sql`ST_SetSRID(ST_GeomFromGeoJSON(${JSON.stringify(feature.geometry)}), 4326)::geography`,
        })
      }

      const records = await trx
        .select(projectLimitSelect)
        .from(projectsLimitsTable)
        .where(eq(projectsLimitsTable.projectId, projectId))

      return {
        collection: {
          type: featureCollectionSchema.properties.type.const,
          features: records.map((record) => ({
            type: featureCollectionSchema.properties.features.items.properties.type.const,
            properties: {},
            geometry: record.polygon,
          })),
        },
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
      collection: {
        type: featureCollectionSchema.properties.type.const,
        features: records.map((record) => ({
          type: featureCollectionSchema.properties.features.items.properties.type.const,
          properties: {},
          geometry: record.polygon,
        })),
      },
    }
  }
}
