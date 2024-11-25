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

      await trx.execute(sql`
        WITH
          input_data AS (
            SELECT ${JSON.stringify(data.geometries)}::jsonb AS geojson_data
          ),
          parsed_features AS (
            SELECT
              jsonb_array_elements(geojson_data->'features') AS feature
            FROM
              input_data
          ),
          feature_collection AS (
            SELECT
              ${projectId}::uuid AS project_id,
              ST_SetSRID(ST_GeomFromGeoJSON(feature->>'geometry'), 4326)::geography AS geometry,
              (feature->'properties')::jsonb AS properties
            FROM
              parsed_features
          )
        INSERT INTO ${projectsLimitsTable} (${sql.raw(projectsLimitsTable.projectId.name)}, ${sql.raw(projectsLimitsTable.geometry.name)}, ${sql.raw(projectsLimitsTable.properties.name)})
        SELECT
          ${sql.raw(projectsLimitsTable.projectId.name)},
          ${sql.raw(projectsLimitsTable.geometry.name)},
          ${sql.raw(projectsLimitsTable.properties.name)}
        FROM
          feature_collection;
      `)

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
