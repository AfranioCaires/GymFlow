import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticateController } from './authenticate-controller'
import { getUserProfileController } from './get-user-profile'
import { registerController } from './register-controller'
import {
  authenticateBodySchema,
  authenticateResponseSchema,
  registerBodySchema,
  userResponseSchema,
} from './dto'

export async function userRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Register a new user',
        body: registerBodySchema,
        response: {
          201: userResponseSchema,
        },
      },
    },
    registerController,
  )

  app.post(
    '/sessions',
    {
      schema: {
        tags: ['Users'],
        summary: 'Authenticate a user',
        body: authenticateBodySchema,
        response: {
          200: authenticateResponseSchema,
        },
      },
    },
    authenticateController,
  )

  /** Authenticated */
  app.get(
    '/users/profile',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Users'],
        summary: 'Get user profile',
        security: [{ bearerAuth: [] }],
        response: {
          200: userResponseSchema,
        },
      },
    },
    getUserProfileController,
  )
}
