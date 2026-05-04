import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { createCheckInController } from './create'
import { getUserCheckInHistoryController } from './history'
import { getUserCheckInMetricsController } from './metrics'
import { validateCheckInController } from './validate'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', getUserCheckInHistoryController)
  app.get('/check-ins/metrics', getUserCheckInMetricsController)

  app.get('/gyms/:gymId/check-ins', createCheckInController)
  app.patch('/check-ins/:checkInId/validate', validateCheckInController)
}
