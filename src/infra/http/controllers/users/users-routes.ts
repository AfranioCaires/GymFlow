import type { FastifyInstance } from 'fastify'

import { HTTP_STATUS } from '../../constants/http-status-codes'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticate } from './authenticate'
import {
  authenticateBodySchema,
  authenticateResponseSchema,
  registerBodySchema,
  userResponseSchema,
} from './dto/users.dto'
import { getUserProfile } from './get-user-profile'
import { refreshToken } from './refresh-token'
import { register } from './register'

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
        response: {
          [HTTP_STATUS.OK]: userResponseSchema,
        },
      },
    },
    getUserProfile,
  )
}
