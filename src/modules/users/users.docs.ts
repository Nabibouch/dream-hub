// src/modules/users/user.docs.ts
import { registry } from '@/docs/registry.js';
import { createUserSchema } from './users.zodschema.js';
import { z } from 'zod';

registry.registerPath({
  method: 'get',
  path: '/users/{id}',
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: 'Utilisateur trouvé',
      content: { 'application/json': { schema: createUserSchema } },
    },
    404: { description: 'Utilisateur non trouvé' },
  },
});

// ... PUT/PATCH avec UpdateUserSchema, DELETE, etc.
