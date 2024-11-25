import { eq, projectsLimitPlateausTable, projectsLimitsTable, projectsPlateausTable, sql } from '@platform/neon'

import { feature as createFeature, featureCollection as createFeatureCollection } from '@turf/turf'
import { ProjectPlateausBaseInsertDto } from '../dtos/projects-plateaus.dto'
import { ProjectLimitPlateaus, projectLimitPlateauSelect } from '../entities/project-limit-plateau.entity'
import { ProjectPlateaus } from '../entities/project-plateau.entity'
import { AbstractRepository } from './abstract.repository'

export class ProjectsLimitPlateausRepository extends AbstractRepository {
  public async replaceByProjectId(projectId: string, data: ProjectPlateausBaseInsertDto): Promise<ProjectPlateaus> {
    const projectPlateaus = await this.entityManager.transaction(async (trx) => {
      await trx.execute(
        sql`SELECT 1 FROM ${projectsLimitsTable} WHERE ${projectsLimitsTable.projectId} = ${projectId} FOR SHARE`
      )

      await trx.execute(
        sql`SELECT 1 FROM ${projectsPlateausTable} WHERE ${projectsPlateausTable.projectId} = ${projectId} FOR UPDATE`
      )

      await trx.execute(
        sql`SELECT 1 FROM ${projectsLimitPlateausTable} WHERE ${projectsLimitPlateausTable.projectId} = ${projectId} FOR UPDATE`
      )

      const intersectionResponse = await trx.execute(sql`
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
              ST_MakeValid(ST_SetSRID(ST_GeomFromGeoJSON(feature->'geometry'), 4326)::geometry) AS geometries
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
              bool_and(ST_Intersects(combined_project_limits.geometries, feature_collection.geometries)) AS all_features_within
            FROM
              feature_collection, combined_project_limits
          )
        SELECT
          all_features_within AS does_intersect
        FROM
          features_within_limits;
      `)

      if (!intersectionResponse.rows[0].does_intersect) {
        throw new RangeError('Invalid project plateaus geometries')
      }

      await trx.delete(projectsPlateausTable).where(eq(projectsPlateausTable.projectId, projectId))
      await trx.delete(projectsLimitPlateausTable).where(eq(projectsLimitPlateausTable.projectId, projectId))

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
        INSERT INTO ${projectsPlateausTable} (${sql.raw(projectsPlateausTable.projectId.name)}, ${sql.raw(projectsPlateausTable.geometry.name)}, ${sql.raw(projectsPlateausTable.properties.name)})
        SELECT
          ${sql.raw(projectsPlateausTable.projectId.name)},
          ${sql.raw(projectsPlateausTable.geometry.name)},
          ${sql.raw(projectsPlateausTable.properties.name)}
        FROM
          feature_collection;
      `)

      await trx.execute(sql`
        WITH
          project_limits AS (
            SELECT
              ${projectsLimitsTable.geometry}
            FROM
              ${projectsLimitsTable}
            WHERE
              ${projectsLimitsTable.projectId} = ${projectId}
          ),
          project_plateaus AS (
            SELECT
              ${projectsPlateausTable.geometry}, ${projectsPlateausTable.properties}
            FROM
              ${projectsPlateausTable}
            WHERE
              ${projectsPlateausTable.projectId} = ${projectId}
          ),
          intersected_geometries AS (
            SELECT
              ${projectId}::uuid AS ${sql.raw(projectsLimitPlateausTable.projectId.name)},
              ST_Intersection(${projectsLimitsTable.geometry}::geometry, ${projectsPlateausTable.geometry}::geometry) AS ${sql.raw(projectsLimitPlateausTable.geometry.name)},
              ${projectsPlateausTable.properties}::jsonb AS ${sql.raw(projectsLimitPlateausTable.properties.name)}
            FROM
              ${projectsLimitsTable}
            CROSS JOIN
              ${projectsPlateausTable}
            WHERE
              ST_Intersects(${projectsLimitsTable.geometry}::geometry, ${projectsPlateausTable.geometry}::geometry)
          ),
          extracted_polygons AS (
            SELECT
              ${sql.raw(projectsPlateausTable.projectId.name)},
              (ST_Dump(ST_CollectionExtract(ST_MakeValid(geometry), 3))).geom AS ${sql.raw(projectsPlateausTable.geometry.name)},
              ${sql.raw(projectsPlateausTable.properties.name)}
            FROM
              intersected_geometries
            WHERE
              NOT ST_IsEmpty(geometry)
          )
        INSERT INTO ${projectsLimitPlateausTable} (${sql.raw(projectsLimitPlateausTable.projectId.name)}, ${sql.raw(projectsLimitPlateausTable.geometry.name)}, ${sql.raw(projectsLimitPlateausTable.properties.name)})
        SELECT
          ${sql.raw(projectsLimitPlateausTable.projectId.name)},
          ${sql.raw(projectsLimitPlateausTable.geometry.name)},
          ${sql.raw(projectsLimitPlateausTable.properties.name)}
        FROM
          extracted_polygons;
      `)

      const records = await trx
        .select(projectLimitPlateauSelect)
        .from(projectsLimitPlateausTable)
        .where(eq(projectsLimitPlateausTable.projectId, projectId))

      return {
        geometries: createFeatureCollection(
          records.map((record) => createFeature(record.geometry, record.properties || {}))
        ),
      }
    })

    return projectPlateaus
  }

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
