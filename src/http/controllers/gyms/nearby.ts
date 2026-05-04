import type { FastifyReply, FastifyRequest } from 'fastify'

import { FetchNearbyGymsUseCaseFactory } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

import type { nearbyGymsQuerySchema } from './dto'
import type { z } from 'zod'

export async function getNearbyGymsController(
  request: FastifyRequest<{ Querystring: z.infer<typeof nearbyGymsQuerySchema> }>,
  reply: FastifyReply,
) {
  const fetchNearbyGymsUseCase = FetchNearbyGymsUseCaseFactory.create()

  const { gyms } = await fetchNearbyGymsUseCase.execute(request.query)

  return reply.status(200).send({ gyms })
}
