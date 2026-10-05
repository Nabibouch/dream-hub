import type {createUserDTO} from "@/modules/users/users.zodschema.js";
import type {User} from "@/modules/users/users.type.js";
import {usersTable} from "@/db/schemas/users.js";
import {eq} from "drizzle-orm";


export interface IAuthRepository {
    create(data: createUserDTO): Promise<User | null>
    findByMail(email: string): Promise<User | null>
}

export class AuthRepository implements IAuthRepository {
    constructor(private database: any) {}

    async create(data: createUserDTO): Promise<User | null> {
        const [user] = await this.database.insert(usersTable).values(data).returning();
        return user ?? null;
    }
    async findByMail(email: string): Promise<User | null> {
        const [user] = await this.database.select().from(usersTable).where(eq(usersTable.email, email));
        return user ?? null;
    }
}