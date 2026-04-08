import type { FastifyInstance } from 'fastify'

import { registerController } from '../controllers/register.controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
}
