import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeSearchGymsUseCase } from '@/infra/factories/make-search-gyms-use-case'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'

import type { SearchGymsQuerySchema } from './dto/gyms.dto'

export async function search(
  request: FastifyRequest<{ Querystring: SearchGymsQuerySchema }>,
  reply: FastifyReply,
) {
  const { query, page } = request.query

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  })

  return reply.status(HTTP_STATUS.OK).send({
    gyms: gyms.map((gym) => ({
      id: gym.id,
      title: gym.title,
      description: gym.description,
      phone: gym.phone,
      latitude: gym.latitude,
      longitude: gym.longitude,
    })),
  })
}
