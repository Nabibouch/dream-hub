import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schemas/users.js";
import type { User } from "./users.type.js";
import type { createUserDTO } from "./users.zodschema.js";


export interface IUserRepository {
  create(data: createUserDTO): Promise<User | null>
  findById(id: string): Promise<User | null>,
  findAll(): Promise<User[]>,
  deleteById(id: string): Promise<User | null>,
  findByEmail(email: string): Promise<User | null>
}

export class UserRepository implements IUserRepository {
  async create(data: createUserDTO): Promise<User | null> {
    const [user] = await db.insert(usersTable).values(data).returning();
    return user ?? null;
  };
  async findById(id: string): Promise<User | null> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return user ?? null;
  };
  async findAll(): Promise<User[]> {
    return await db.select().from(usersTable);
  };
  async deleteById(id: string): Promise<User | null> {
    const [deletedUser] = await db.delete(usersTable).where(eq(usersTable.id, id)).returning();
    return deletedUser ?? null;
  };
  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    return user ?? null;
  }
}
