import { registry } from '@/docs/registry.js';
import { loginSchema, registerSchema } from './auth.zodschema.js';
import { publicUserSchema } from '@/modules/users/users.zodschema.js';
import { z } from 'zod';

const errorSchema = z.object({
  name: z.string(),
  message: z.string(),
}).openapi('ErrorResponse');

const validationErrorSchema = z.object({
  message: z.string(),
  error: z.object({
    formErrors: z.array(z.string()),
    fieldErrors: z.record(z.string(), z.array(z.string())),
  }),
}).openapi('ValidationErrorResponse');

registry.registerPath({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  request: {
    body: {
      content: { 'application/json': { schema: registerSchema } },
    },
  },
  responses: {
    201: {
      description: 'Utilisateur inscrit (sans mot de passe)',
      content: { 'application/json': { schema: publicUserSchema } },
    },
    400: {
      description: 'Données invalides',
      content: { 'application/json': { schema: validationErrorSchema } },
    },
    409: {
      description: 'Email déjà utilisé',
      content: { 'application/json': { schema: errorSchema } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  request: {
    body: {
      content: { 'application/json': { schema: loginSchema } },
    },
  },
  responses: {
    200: {
      description: 'Connexion réussie (utilisateur sans mot de passe)',
      content: { 'application/json': { schema: publicUserSchema } },
    },
    400: {
      description: 'Données invalides',
      content: { 'application/json': { schema: validationErrorSchema } },
    },
    401: {
      description: 'Email ou mot de passe incorrect',
      content: { 'application/json': { schema: errorSchema } },
    },
  },
});
