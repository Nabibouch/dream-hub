import type { usersTable } from "../../db/schemas/users.js";

export type User = typeof usersTable.$inferSelect;
