import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schemas/users.js";
import type { User } from "./users.type.js";
import type { createUserDTO } from "./users.zodschema.js";


export interface IUserRepository {
  create(data: createUserDTO): Promise<User>,
  findById(id: string): Promise<User>
}

export class UserRepository implements IUserRepository {
  async create(data: createUserDTO): Promise<User> {
    const [user] = await db.insert(usersTable).values(data).returning();
    if (!user) throw new Error("Erreur lors de la création de l'utilisateur");
    return user;
  };
  async findById(id: string): Promise<User> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
    if (!user) throw new Error(`Aucun utilisateur avec l'id ${id} n'a été trouvé`);
    return user;
  };
  async findAll(): Promise<User[]> {
    return await db.select().from(usersTable);
  };
  async deleteById(id: string): Promise<User> {
    const [deletedUser] = await db.delete(usersTable).where(eq(usersTable.id, id)).returning();
    if (!deletedUser) throw new Error(`Aucun utilisateur avec l'id ${id} n'a été trouvé`);
    return deletedUser;
  };
  async findByEmail(email: string): Promise<User> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!user) throw new Error(`Aucun utilisateur avec l'email ${email} n'a été trouvé`);
    return user;
  }
}
