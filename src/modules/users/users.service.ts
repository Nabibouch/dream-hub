import type { IUserRepository } from "./users.repository.js";
import type { User } from "./users.type.js";
import { createUserSchema, type createUserDTO } from "./users.zodschema.js";


export class UserService {
  constructor(private userRepository: IUserRepository) { }

  async createUser(data: unknown): Promise<User> {
    const valideData: createUserDTO = createUserSchema.parse(data);
    return await this.userRepository.create(valideData);
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }
}
