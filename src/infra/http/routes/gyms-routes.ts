import type { FastifyInstance } from 'fastify'

import { create } from '../controllers/gyms/create'
import {
  createGymBodySchema,
  searchGymsQuerySchema,
  nearbyGymsQuerySchema,
} from '../controllers/gyms/dto/gyms.dto'
import { nearby } from '../controllers/gyms/nearby'
import { search } from '../controllers/gyms/search'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get(
    '/gyms/search',
    {
      schema: {
        tags: ['Gyms'],
        summary: 'Search for gyms by title',
        security: [{ bearerAuth: [] }],
        querystring: searchGymsQuerySchema,
      },
    },
    search,
  )

  app.get(
    '/gyms/nearby',
    {
      schema: {
        tags: ['Gyms'],
        summary: 'Find nearby gyms',
        security: [{ bearerAuth: [] }],
        querystring: nearbyGymsQuerySchema,
      },
    },
    nearby,
  )

  app.post(
    '/gyms',
    {
      schema: {
        tags: ['Gyms'],
        summary: 'Create a new gym',
        security: [{ bearerAuth: [] }],
        body: createGymBodySchema,
      },
    },
    create,
  )
}
