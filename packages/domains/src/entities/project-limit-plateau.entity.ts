import { InferModelFromColumns, projectsLimitPlateausTable, sql } from '@platform/neon'

import { FeatureCollection } from '../objects/feature-collection.object'
import { Polygon } from '../objects/polygon.object'

export const projectLImitPlateauSelect = {
  geometry: sql<Polygon>`ST_AsGeoJSON(${projectsLimitPlateausTable.geometry}, 15)::json`.as('geometry'),
  properties: projectsLimitPlateausTable.properties,
}

export type ProjectLImitPlateau = InferModelFromColumns<Omit<typeof projectLImitPlateauSelect, 'geometry'>> & {
  geometry: Polygon
}

export type ProjectLImitPlateaus = { geometries: FeatureCollection }
