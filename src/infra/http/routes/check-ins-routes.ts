import type { FastifyInstance } from 'fastify'

import { create } from '../controllers/check-ins/create'
import {
  createCheckInBodySchema,
  createCheckInParamsSchema,
  validateCheckInParamsSchema,
  checkInHistoryQuerySchema,
} from '../controllers/check-ins/dto/check-ins.dto'
import { history } from '../controllers/check-ins/history'
import { metrics } from '../controllers/check-ins/metrics'
import { validate } from '../controllers/check-ins/validate'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get(
    '/check-ins/history',
    {
      schema: {
        tags: ['Check-ins'],
        summary: 'Get user check-in history',
        security: [{ bearerAuth: [] }],
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
        security: [{ bearerAuth: [] }],
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
        security: [{ bearerAuth: [] }],
        params: createCheckInParamsSchema,
        body: createCheckInBodySchema,
      },
    },
    create,
  )

  app.patch(
    '/check-ins/:checkInId/validate',
    {
      schema: {
        tags: ['Check-ins'],
        summary: 'Validate a check-in',
        security: [{ bearerAuth: [] }],
        params: validateCheckInParamsSchema,
      },
    },
    validate,
  )
}
