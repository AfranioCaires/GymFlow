import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserRole } from '../../middlewares/verify-user-role'
import { create } from './create'
import { createGymBodySchema, nearbyGymsQuerySchema, searchGymsQuerySchema } from './dto/gyms.dto'
import { nearby } from './nearby'
import { search } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get(
    '/gyms/search',
    {
      schema: {
        tags: ['Gyms'],
        summary: 'Search for gyms by title',
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
        querystring: nearbyGymsQuerySchema,
      },
    },
    nearby,
  )

  app.post(
    '/gyms',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Gyms'],
        summary: 'Create a new gym',
        body: createGymBodySchema,
      },
    },
    create,
  )
}
