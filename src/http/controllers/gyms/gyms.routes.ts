import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { createGymController } from './create'
import { getNearbyGymsController } from './nearby'
import { searchGymsController } from './search'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', createGymController)
  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', getNearbyGymsController)
}
