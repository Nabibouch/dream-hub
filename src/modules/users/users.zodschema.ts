import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(2, "Le pseudo doit être de minimum 2 caractères")
    .openapi({example :"John"}),
  age: z
    .number()
    .positive()
    .lte(100)
    .openapi({example : 22}),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .openapi({example : "******"}),
  email: z
    .email()
    .openapi({example : "johndoe@email.com"}),
}).strict().openapi("CreateUser");

export type createUserDTO = z.infer<typeof createUserSchema>;

export const publicUserSchema = z.object({
  id: z.uuid(),
  username: z.string().openapi({ example: 'John' }),
  email: z.email().openapi({ example: 'johndoe@email.com' }),
  age: z.number().nullable().openapi({ example: 22 }),
  bio: z.string().nullable(),
  created_at: z.string().nullable(),
}).openapi('PublicUser');
