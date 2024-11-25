import { InferModelFromColumns, projectsLimitPlateausTable, sql } from '@platform/neon'

import { FeatureCollection } from '../objects/feature-collection.object'
import { Polygon } from '../objects/polygon.object'

export const projectLimitPlateauSelect = {
  geometry: sql<Polygon>`ST_AsGeoJSON(${projectsLimitPlateausTable.geometry}, 15)::json`.as('geometry'),
  properties: projectsLimitPlateausTable.properties,
}

export type ProjectLimitPlateau = InferModelFromColumns<Omit<typeof projectLimitPlateauSelect, 'geometry'>> & {
  geometry: Polygon
}

export type ProjectLimitPlateaus = { geometries: FeatureCollection }
