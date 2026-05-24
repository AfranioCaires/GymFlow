import type { FastifyInstance } from 'fastify'

import { HTTP_STATUS } from '../constants/http-status-codes'
import { authenticate } from '../controllers/users/authenticate'
import {
  authenticateBodySchema,
  authenticateResponseSchema,
  registerBodySchema,
  userResponseSchema,
} from '../controllers/users/dto/users.dto'
import { getUserProfile } from '../controllers/users/get-user-profile'
import { refreshToken } from '../controllers/users/refresh-token'
import { register } from '../controllers/users/register'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Register a new user',
        body: registerBodySchema,
        response: {
          [HTTP_STATUS.CREATED]: userResponseSchema,
        },
      },
    },
    register,
  )

  app.post(
    '/sessions',
    {
      schema: {
        tags: ['Users'],
        summary: 'Authenticate a user',
        body: authenticateBodySchema,
        response: {
          [HTTP_STATUS.OK]: authenticateResponseSchema,
        },
      },
    },
    authenticate,
  )

  app.patch(
    '/token/refresh',
    {
      schema: {
        tags: ['Users'],
        summary: 'Refresh a token',
        response: {
          [HTTP_STATUS.OK]: authenticateResponseSchema,
        },
      },
    },
    refreshToken,
  )

  app.get(
    '/users/profile',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Users'],
        summary: 'Get user profile',
        security: [{ bearerAuth: [] }],
        response: {
          [HTTP_STATUS.OK]: userResponseSchema,
        },
      },
    },
    getUserProfile,
  )
}
