import type { FastifyReply, FastifyRequest } from 'fastify'

import { SearchGymsUseCaseFactory } from '@/use-cases/factories/make-search-gyms-use-case'

import type { SearchGymsQuerySchema } from './dto/gyms.dto'

export async function searchGymsController(
  request: FastifyRequest<{ Querystring: SearchGymsQuerySchema }>,
  reply: FastifyReply,
) {
  const searchGymUseCase = SearchGymsUseCaseFactory.create()

  const { gyms } = await searchGymUseCase.execute(request.query)

  return reply.status(200).send({ gyms })
}
