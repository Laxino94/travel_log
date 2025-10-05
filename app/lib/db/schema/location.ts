import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const location = sqliteTable('location', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(), // it will be used in the URL for specific location page
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  // createAt: int({mode: "timestamp"}).notNull().$default(() => Date.now())
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now())
})
