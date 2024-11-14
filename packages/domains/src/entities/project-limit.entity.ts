import { projectsLimitsTable, sql } from '@platform/neon'

import { FeatureCollection } from '../objects/feature-collection.object'
import { Polygon } from '../objects/polygon.object'

export const projectLimitSelect = {
  polygon: sql<Polygon>`ST_AsGeoJSON(${projectsLimitsTable.polygon}, 15)::json`.as('polygon'),
}

export type ProjectLimit = { polygon: Polygon }

export type ProjectLimits = { collection: FeatureCollection }
