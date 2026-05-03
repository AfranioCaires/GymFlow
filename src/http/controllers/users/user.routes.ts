import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticateController } from './authenticate-controller'
import { getUserProfileController } from './get-user-profile'
import { registerController } from './register-controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
  app.get('/users/profile', { onRequest: [verifyJWT] }, getUserProfileController)
}
