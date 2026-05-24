import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserRole } from '../../middlewares/verify-user-role'
import { create } from './create'
import {
  createCheckInBodySchema,
  createCheckInParamsSchema,
  validateCheckInParamsSchema,
  checkInHistoryQuerySchema,
} from './dto/check-ins.dto'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get(
    '/check-ins/history',
    {
      schema: {
        tags: ['Check-ins'],
        summary: 'Get user check-in history',
        querystring: checkInHistoryQuerySchema,
      },
    },
    history,
  )

  app.get(
    '/check-ins/metrics',
    {
      schema: {
        tags: ['Check-ins'],
        summary: 'Get user check-in metrics',
      },
    },
    metrics,
  )

  app.post(
    '/gyms/:gymId/check-ins',
    {
      schema: {
        tags: ['Check-ins'],
        summary: 'Create a new check-in',
        params: createCheckInParamsSchema,
        body: createCheckInBodySchema,
      },
    },
    create,
  )

  app.patch(
    '/check-ins/:checkInId/validate',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Check-ins'],
        summary: 'Validate a check-in',
        params: validateCheckInParamsSchema,
      },
    },
    validate,
  )
}
