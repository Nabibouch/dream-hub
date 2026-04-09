import { z } from "zod";


export const registerSchema = z.object({
  username: z.string().min(2, "Le pseudo doit être de minimum 2 caractère"),
  email: z.email(),
  password: z.string().min(6, "Le mot de passe doit contenir au mois 6 caractères"),
  age: z.number().positive().lte(100),
}).strict();

export type registerDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Le mot de passe doit contenir au mois 6 caractères")
}).strict();

export type loginDTO = z.infer<typeof loginSchema>;
