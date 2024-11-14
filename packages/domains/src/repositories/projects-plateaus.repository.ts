import { eq, projectsPlateausTable, sql } from '@platform/neon'

import { ProjectPlateausBaseInsertDto } from '../dtos/projects-plateaus.dto'
import { ProjectPlateaus, projectPlateauSelect } from '../entities/project-plateau.entity'
import { AbstractRepository } from './abstract.repository'
import { featureCollectionSchema } from '../objects/feature-collection.object'

export class ProjectsPlateausRepository extends AbstractRepository {
  public async replaceByProjectId(projectId: string, data: ProjectPlateausBaseInsertDto): Promise<ProjectPlateaus> {
    const projectPlateaus = await this.entityManager.transaction(async (trx) => {
      await trx.execute(
        sql`SELECT 1 FROM ${projectsPlateausTable} WHERE ${projectsPlateausTable.projectId} = ${projectId} FOR UPDATE`
      )

      await trx.delete(projectsPlateausTable).where(eq(projectsPlateausTable.projectId, projectId))

      for (const feature of data.collection.features) {
        await trx.insert(projectsPlateausTable).values({
          projectId,
          geometry: sql`ST_SetSRID(ST_GeomFromGeoJSON(${JSON.stringify(feature.geometry)}), 4326)::geography`,
          properties: feature.properties,
        })
      }

      const records = await trx
        .select(projectPlateauSelect)
        .from(projectsPlateausTable)
        .where(eq(projectsPlateausTable.projectId, projectId))

      return {
        collection: {
          type: featureCollectionSchema.properties.type.const,
          features: records.map((record) => ({
            type: featureCollectionSchema.properties.features.items.properties.type.const,
            geometry: record.geometry,
            properties: record.properties,
          })),
        },
      }
    })

    return projectPlateaus as ProjectPlateaus
  }

  public async getByProjectId(projectId: string): Promise<ProjectPlateaus> {
    const records = await this.entityManager
      .select(projectPlateauSelect)
      .from(projectsPlateausTable)
      .where(eq(projectsPlateausTable.projectId, projectId))

    return {
      collection: {
        type: featureCollectionSchema.properties.type.const,
        features: records.map((record) => ({
          type: featureCollectionSchema.properties.features.items.properties.type.const,
          geometry: record.geometry,
          properties: record.properties,
        })),
      },
    } as ProjectPlateaus
  }
}
