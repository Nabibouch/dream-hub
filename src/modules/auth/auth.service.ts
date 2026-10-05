import { loginSchema, registerSchema } from "./auth.zodschema.js";
import { hashPassword, verifyPassword } from "@/common/security/password.js";
import type {IAuthRepository} from "@/modules/auth/auth.repository.js";


export class AuthService {
  constructor(private authRepository: IAuthRepository) { };

  async register(data: unknown) {
    const valideData = registerSchema.parse(data);
    const existingUser = await this.authRepository.findByMail(valideData.email);
    if (existingUser) throw new Error("Email déjà utilisé par un utilisateur");

    const hashedPassword = await hashPassword(valideData.password);

    const user = await this.authRepository.create({
      username: valideData.username,
      email: valideData.email,
      password: hashedPassword,
      age: valideData.age
    });
    if (!user) throw new Error("Erreur lors de la création de l'utilisateur");
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };

  async login(data: unknown) {
    const valideData = loginSchema.parse(data);
    const user = await this.authRepository.findByMail(valideData.email);
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
