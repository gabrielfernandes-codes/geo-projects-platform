import { sql } from 'drizzle-orm'
import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core'

import { projectsTable } from './projects.schema'

const onUpdatedAt = () => new Date()

export const projectsPlot = pgTable('projects_plot', {
  id: uuid('id')
    .default(sql`uuid_generate_v7()`)
    .primaryKey(),
  projectId: uuid('project_id')
    .references(() => projectsTable.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(onUpdatedAt),
})
