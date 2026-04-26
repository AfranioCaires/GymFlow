import type { FastifyInstance } from 'fastify'

import { authenticateController } from '../controllers/authenticate-controller'
import { getUserProfileController } from '../controllers/get-user-profile'
import { registerController } from '../controllers/register-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
  app.get('/users/profile', { onRequest: [verifyJWT] }, getUserProfileController)
}
