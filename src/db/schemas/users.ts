import { integer, pgTable, varchar, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  username: varchar({ length : 255 }).notNull(),
  age: integer(),
  password: varchar({ length : 64 }).notNull(),
  email: varchar({ length : 255 }).notNull(),
  bio: text(),
  created_at: timestamp().defaultNow()
})
