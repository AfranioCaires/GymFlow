import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { createCheckInController } from './create'
import { getUserCheckInHistoryController } from './history'
import { getUserCheckInMetricsController } from './metrics'
import {
  checkInHistoryQuerySchema,
  checkInHistoryResponseSchema,
  checkInResponseSchema,
  createCheckInBodySchema,
  createCheckInParamsSchema,
  userMetricsResponseSchema,
  validateCheckInParamsSchema,
} from './schemas'
import { validateCheckInController } from './validate'

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
        response: {
          200: checkInHistoryResponseSchema,
        },
      },
    },
    getUserCheckInHistoryController,
  )

  app.get(
    '/check-ins/metrics',
    {
      schema: {
        tags: ['Check-ins'],
        summary: 'Get user check-in metrics',
        security: [{ bearerAuth: [] }],
        response: {
          200: userMetricsResponseSchema,
        },
      },
    },
    getUserCheckInMetricsController,
  )

  app.post(
    '/gyms/:gymId/check-ins',
    {
      schema: {
        tags: ['Check-ins'],
        summary: 'Create a check-in at a gym',
        security: [{ bearerAuth: [] }],
        params: createCheckInParamsSchema,
        body: createCheckInBodySchema,
        response: {
          201: checkInResponseSchema,
        },
      },
    },
    createCheckInController,
  )

  app.patch(
    '/check-ins/:checkInId/validate',
    {
      schema: {
        tags: ['Check-ins'],
        summary: 'Validate a check-in',
        security: [{ bearerAuth: [] }],
        params: validateCheckInParamsSchema,
        response: {
          204: z.null(),
        },
      },
    },
    validateCheckInController,
  )
}
