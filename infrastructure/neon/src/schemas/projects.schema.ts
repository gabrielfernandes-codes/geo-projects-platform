import { sql } from 'drizzle-orm'
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core'

const onUpdatedAt = () => new Date()

export const projectsTable = pgTable('projects', {
  id: uuid('id')
    .default(sql`uuid_generate_v7()`)
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(onUpdatedAt),
})
