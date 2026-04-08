import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(2, "Le pseudo doit être de minimum 2 caractère"),
  age: z.number().positive().lte(100),
  password: z.string().min(6),
  email: z.email(),
}).strict();

export type createUserDTO = z.infer<typeof createUserSchema>;
