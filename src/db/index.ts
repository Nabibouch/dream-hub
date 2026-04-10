import { drizzle } from 'drizzle-orm/node-postgres';

const db_url = process.env.DATABASE_URL;
if (!db_url) throw new Error("DATABASE_URL vide");
export const db = drizzle(db_url);
