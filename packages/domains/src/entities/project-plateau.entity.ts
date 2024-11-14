import { projectsPlateausTable, sql } from '@platform/neon'

import { FeatureCollection } from '../objects/feature-collection.object'
import { Polygon } from '../objects/polygon.object'

export const projectPlateauSelect = {
  polygon: sql<Polygon>`ST_AsGeoJSON(${projectsPlateausTable.polygon}, 15)::json`.as('polygon'),
}

export type ProjectPlateau = { polygon: Polygon }

export type ProjectPlateaus = { collection: FeatureCollection }
