import type { FastifyReply, FastifyRequest } from 'fastify'

import { SearchGymsUseCaseFactory } from '@/use-cases/factories/make-search-gyms-use-case'

import type { searchGymsQuerySchema } from './dto'
import type { z } from 'zod'

export async function searchGymsController(
  request: FastifyRequest<{ Querystring: z.infer<typeof searchGymsQuerySchema> }>,
  reply: FastifyReply,
) {
  const searchGymUseCase = SearchGymsUseCaseFactory.create()

  const { gyms } = await searchGymUseCase.execute(request.query)

  return reply.status(200).send({ gyms })
}
