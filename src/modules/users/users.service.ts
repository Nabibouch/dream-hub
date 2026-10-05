import { NotFoundError } from "@/common/errors/NotFoundError.js";
import type { IUserRepository } from "./users.repository.js";
import type { PublicUser, User } from "./users.type.js";

const withoutPassword = ({ password, ...user }: User): PublicUser => user;


export class UserService {
  constructor(private userRepository: IUserRepository) { }

  async getUserById(id: string): Promise<PublicUser> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError(`Aucun utilisateur avec l'id ${id} n'a été trouvé`);
    return withoutPassword(user);
  };

  async getUserByEmail(email: string): Promise<PublicUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundError(`Aucun utilisateur avec l'email ${email} n'a été trouvé`);
    return withoutPassword(user);
  };

  async getAllUsers(): Promise<PublicUser[]> {
    const users = await this.userRepository.findAll();
    return users.map(withoutPassword);
  };

  async deleteUserById(id: string): Promise<PublicUser> {
    const deletedUser = await this.userRepository.deleteById(id);
    if (!deletedUser) throw new NotFoundError(`Aucun utilisateur avec l'id ${id} n'a été trouvé`);
    return withoutPassword(deletedUser);
  }
}
