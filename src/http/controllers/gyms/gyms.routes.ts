import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { createGymController } from './create'
import { getNearbyGymsController } from './nearby'
import {
  createGymBodySchema,
  gymResponseSchema,
  gymsResponseSchema,
  nearbyGymsQuerySchema,
  searchGymsQuerySchema,
} from './dto'
import { searchGymsController } from './search'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post(
    '/gyms',
    {
      schema: {
        tags: ['Gyms'],
        summary: 'Create a new gym',
        security: [{ bearerAuth: [] }],
        body: createGymBodySchema,
        response: {
          201: gymResponseSchema,
        },
      },
    },
    createGymController,
  )

  app.get(
    '/gyms/search',
    {
      schema: {
        tags: ['Gyms'],
        summary: 'Search for gyms by title',
        security: [{ bearerAuth: [] }],
        querystring: searchGymsQuerySchema,
        response: {
          200: gymsResponseSchema,
        },
      },
    },
    searchGymsController,
  )

  app.get(
    '/gyms/nearby',
    {
      schema: {
        tags: ['Gyms'],
        summary: 'Find nearby gyms',
        security: [{ bearerAuth: [] }],
        querystring: nearbyGymsQuerySchema,
        response: {
          200: gymsResponseSchema,
        },
      },
    },
    getNearbyGymsController,
  )
}
