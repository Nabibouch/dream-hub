import type { UserService } from "../users/users.service.js";
import { loginSchema, registerSchema } from "./auth.zodschema.js";
import { hashPassword, verifyPassword } from "../../lib/security/password.js";


export class AuthService {
  constructor(private userService: UserService) { };

  async register(data: unknown) {
    const valideData = registerSchema.parse(data);
    const existingUser = await this.userService.getUserByEmail(valideData.email);
    if (existingUser) throw new Error("Email déjà utilisé par un utilisateur");

    const hashedPassword = await hashPassword(valideData.password);

    const user = await this.userService.createUser({
      username: valideData.username,
      email: valideData.email,
      password: hashedPassword,
      age: valideData.age
    });
    return user;
  };
  async login(data: unknown) {
    const valideData = loginSchema.parse(data);
    const user = await this.userService.getUserByEmail(valideData.email);
    if (!user) {
      throw new Error(`Aucun utilisateur inscrit avec le mail : ${valideData.email}`);
    };

    if (!(await verifyPassword(valideData.password, user.password))) {
      throw new Error("Mot de passe incorrect");
    };
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

}
