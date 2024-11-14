import { InferModelFromColumns, projectsPlateausTable, sql } from '@platform/neon'

import { FeatureCollection } from '../objects/feature-collection.object'
import { Polygon } from '../objects/polygon.object'

export const projectPlateauSelect = {
  geometry: sql<Polygon>`ST_AsGeoJSON(${projectsPlateausTable.geometry}, 15)::json`.as('geometry'),
  properties: projectsPlateausTable.properties,
}

export type ProjectPlateau = InferModelFromColumns<Omit<typeof projectPlateauSelect, 'geometry'>> & {
  geometry: Polygon
}

export type ProjectPlateaus = { collection: FeatureCollection }
