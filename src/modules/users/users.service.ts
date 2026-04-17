import { NotFoundError } from "@/common/errors/NotFoundError.js";
import type { IUserRepository } from "./users.repository.js";
import type { User } from "./users.type.js";
import { createUserSchema, type createUserDTO } from "./users.zodschema.js";


export class UserService {
  constructor(private userRepository: IUserRepository) { }

  async createUser(data: unknown): Promise<User> {
    const valideData: createUserDTO = createUserSchema.parse(data);
    const user = await this.userRepository.create(valideData);
    if (!user) throw new NotFoundError("Erreur lors de la création de l'utilisateur");
    return user;
  };

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError(`Aucun utilisateur avec l'id ${id} n'a été trouvé`);
    return user;
  };

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundError(`Aucun utilisateur avec l'email ${email} n'a été trouvé`);
    return user;
  };

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  };

  async deleteUserById(id: string): Promise<User> {
    const deletedUser = await this.userRepository.deleteById(id);
    if (!deletedUser) throw new NotFoundError(`Aucun utilisateur avec l'id ${id} n'a été trouvé`);
    return deletedUser;
  }
}
