import { InferModelFromColumns, projectsLimitsTable, sql } from '@platform/neon'

import { FeatureCollection } from '../objects/feature-collection.object'
import { Polygon } from '../objects/polygon.object'

export const projectLimitSelect = {
  geometry: sql<Polygon>`ST_AsGeoJSON(${projectsLimitsTable.geometry}, 15)::json`.as('geometry'),
  properties: projectsLimitsTable.properties,
}

export type ProjectLimit = InferModelFromColumns<Omit<typeof projectLimitSelect, 'geometry'>> & {
  geometry: Polygon
}

export type ProjectLimits = { collection: FeatureCollection }
