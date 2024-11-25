import { getTableColumns, sql } from 'drizzle-orm'
import { index, pgTable, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { geography } from '../migrations/columns/geography.column'
import { onUpdateCallback } from '../utils/operations.util'
import { projectsTable } from './projects.schema'

export const projectsLimitPlateausTable = pgTable(
  'projects_limit_plateaus',
  {
    id: uuid('id')
      .default(sql`uuid_generate_v7()`)
      .primaryKey(),
    projectId: uuid('project_id')
      .references(() => projectsTable.id)
      .notNull(),
    geometry: geography('geometry', { type: 'Polygon' }).notNull(),
    properties: jsonb('properties'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(onUpdateCallback),
  },
  (table) => ({
    geometryIndex: index('projects_limit_plateaus_geometry_idx').using('gist', table.geometry),
  })
)

export const projectsLimitPlateausTableColumns = getTableColumns(projectsLimitPlateausTable)

export const insertProjectsLimitPlateausSchema = createInsertSchema(projectsLimitPlateausTable)

export const selectProjectsLimitPlateausSchema = createSelectSchema(projectsLimitPlateausTable)
