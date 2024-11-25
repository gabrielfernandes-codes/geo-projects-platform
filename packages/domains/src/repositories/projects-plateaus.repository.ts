import { eq, projectsLimitsTable, projectsPlateausTable, sql } from '@platform/neon'

import { feature as createFeature, featureCollection as createFeatureCollection } from '@turf/turf'
import { ProjectPlateausBaseInsertDto } from '../dtos/projects-plateaus.dto'
import { ProjectPlateaus, projectPlateauSelect } from '../entities/project-plateau.entity'
import { AbstractRepository } from './abstract.repository'

export class ProjectsPlateausRepository extends AbstractRepository {
  public async replaceByProjectId(projectId: string, data: ProjectPlateausBaseInsertDto): Promise<ProjectPlateaus> {
    const projectPlateaus = await this.entityManager.transaction(async (trx) => {
      await trx.execute(
        sql`SELECT 1 FROM ${projectsLimitsTable} WHERE ${projectsLimitsTable.projectId} = ${projectId} FOR SHARE`
      )

      await trx.execute(
        sql`SELECT 1 FROM ${projectsPlateausTable} WHERE ${projectsPlateausTable.projectId} = ${projectId} FOR UPDATE`
      )

      const geometriesStringified = JSON.stringify(data.geometries)

      const isWithinResponse = await trx.execute(sql`
        WITH
          input_data AS (
              SELECT ${geometriesStringified}::jsonb AS geojson_data
          ),
          parsed_features AS (
              SELECT
                  jsonb_array_elements(geojson_data->'features') AS feature
              FROM
                  input_data
          ),
          feature_collection AS (
              SELECT
                  ST_MakeValid(
                      ST_SetSRID(ST_GeomFromGeoJSON(feature->'geometry'), 4326)::geometry
                  ) AS geometries
              FROM
                  parsed_features
          ),
          combined_project_limits AS (
              SELECT
                  ST_Union(${projectsLimitsTable.geometry}::geometry) AS geometries
              FROM
                  ${projectsLimitsTable}
              WHERE
                  ${projectsLimitsTable.projectId} = ${projectId}
          ),
          features_within_limits AS (
              SELECT
                  bool_and(ST_Within(feature_collection.geometries, combined_project_limits.geometries)) AS all_features_within
              FROM
                  feature_collection, combined_project_limits
          )
        SELECT
            all_features_within AS is_within
        FROM
            features_within_limits;
      `)

      if (!isWithinResponse.rows[0].is_within) {
        throw new Error('The provided plateaus are not within the project limits')
      }

      await trx.delete(projectsPlateausTable).where(eq(projectsPlateausTable.projectId, projectId))

      for (const feature of data.geometries.features) {
        const geometryStringified = JSON.stringify(feature.geometry)

        await trx.insert(projectsPlateausTable).values({
          projectId,
          geometry: sql`ST_SetSRID(ST_GeomFromGeoJSON(${geometryStringified}), 4326)::geography`,
          properties: feature.properties,
        })
      }

      const records = await trx
        .select(projectPlateauSelect)
        .from(projectsPlateausTable)
        .where(eq(projectsPlateausTable.projectId, projectId))

      return {
        geometries: createFeatureCollection(
          records.map((record) => createFeature(record.geometry, record.properties || {}))
        ),
      }
    })

    return projectPlateaus
  }

  public async getByProjectId(projectId: string): Promise<ProjectPlateaus> {
    const records = await this.entityManager
      .select(projectPlateauSelect)
      .from(projectsPlateausTable)
      .where(eq(projectsPlateausTable.projectId, projectId))

    return {
      geometries: createFeatureCollection(
        records.map((record) => createFeature(record.geometry, record.properties || {}))
      ),
    }
  }
}
