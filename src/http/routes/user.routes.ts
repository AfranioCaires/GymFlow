import type { FastifyInstance } from 'fastify'

import { authenticateController } from '../controllers/authenticate-controller'
import { getUserProfileController } from '../controllers/get-user-profile'
import { registerController } from '../controllers/register-controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
  app.get('/users/profile', getUserProfileController)
}
