import { getTableColumns, sql } from 'drizzle-orm'
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { onUpdateCallback } from '../utils/operations.util'

export const projectsTable = pgTable('projects', {
  id: uuid('id')
    .default(sql`uuid_generate_v7()`)
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(onUpdateCallback),
})

export const projectTableColumns = getTableColumns(projectsTable)

export const insertProjectSchema = createInsertSchema(projectsTable)

export const selectProjectSchema = createSelectSchema(projectsTable)
