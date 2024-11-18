import { getTableColumns, sql } from 'drizzle-orm'
import { index, pgTable, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { geography } from '../migrations/columns/geography.column'
import { onUpdateCallback } from '../utils/operations.util'
import { projectsTable } from './projects.schema'

export const projectsPlateausTable = pgTable(
  'projects_plateaus',
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
    geometryIndex: index('projects_plateaus_geometry_idx').using('gist', table.geometry),
  })
)

export const projectsPlateausTableColumns = getTableColumns(projectsPlateausTable)

export const insertProjectsPlateausSchema = createInsertSchema(projectsPlateausTable)

export const selectProjectsPlateausSchema = createSelectSchema(projectsPlateausTable)
