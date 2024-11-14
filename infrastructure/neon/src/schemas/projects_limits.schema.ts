import { getTableColumns, sql } from 'drizzle-orm'
import { index, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

import { geography } from '../migrations/columns/geography.column'
import { onUpdateCallback } from '../utils/operations.util'
import { projectsTable } from './projects.schema'

export const projectsLimitsTable = pgTable(
  'projects_limits',
  {
    id: uuid('id')
      .default(sql`uuid_generate_v7()`)
      .primaryKey(),
    projectId: uuid('project_id')
      .references(() => projectsTable.id)
      .notNull(),
    polygon: geography('polygon', { type: 'Polygon' }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(onUpdateCallback),
  },
  (table) => ({
    polygonIndex: index('projects_limits_polygon_idx').using('gist', table.polygon),
  })
)

export const projectsLimitsTableColumns = getTableColumns(projectsLimitsTable)
