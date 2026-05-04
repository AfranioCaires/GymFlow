import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { paginationSchema } from '@/config/pagination'
import { SearchGymsUseCaseFactory } from '@/use-cases/factories/make-search-gyms-use-case'

export async function searchGymsController(request: FastifyRequest, reply: FastifyReply) {
  const searcGymsQuerySchema = z
    .object({
      query: z.string(),
    })
    .extend(paginationSchema.shape)

  const searchGymUseCase = SearchGymsUseCaseFactory.create()

  const input = searcGymsQuerySchema.parse(request.query)

  const { gyms } = await searchGymUseCase.execute(input)

  return reply.status(200).send({ gyms })
}
