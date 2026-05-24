import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { createGymController } from './create'
import {
  createGymBodySchema,
  gymResponseSchema,
  gymsResponseSchema,
  nearbyGymsQuerySchema,
  searchGymsQuerySchema,
} from './dto/gyms.dto'
import { nearbyGymsController } from './nearby'
import { searchGymsController } from './search'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post(
    '/gyms',
    {
      schema: {
        tags: ['Gyms'],
        summary: 'Create a new gym',
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
        querystring: nearbyGymsQuerySchema,
        response: {
          200: gymsResponseSchema,
        },
      },
    },
    nearbyGymsController,
  )
}
