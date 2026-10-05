import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schemas/users.js";
import type { User } from "./users.type.js";


export interface IUserRepository {
  findById(id: string): Promise<User | null>,
  findAll(): Promise<User[]>,
  deleteById(id: string): Promise<User | null>,
  findByEmail(email: string): Promise<User | null>
}

export class UserRepository implements IUserRepository {
  constructor(private database: any){} // type any here because the type is a bit fuzzy thanks to the transaction... Need to be change
  async findById(id: string): Promise<User | null> {
    const [user] = await this.database.select().from(usersTable).where(eq(usersTable.id, id));
    return user ?? null;
  };
  async findAll(): Promise<User[]> {
    return await this.database.select().from(usersTable);
  };
  async deleteById(id: string): Promise<User | null> {
    const [deletedUser] = await this.database.delete(usersTable).where(eq(usersTable.id, id)).returning();
    return deletedUser ?? null;
  };
  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.database.select().from(usersTable).where(eq(usersTable.email, email));
    return user ?? null;
  }
}
