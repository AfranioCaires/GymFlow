import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchNearbyGymsUseCase } from '@/infra/factories/make-fetch-nearby-gyms-use-case'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'

import type { NearbyGymsQuerySchema } from './dto/gyms.dto'

export async function nearby(
  request: FastifyRequest<{ Querystring: NearbyGymsQuerySchema }>,
  reply: FastifyReply,
) {
  const { userLatitude, userLongitude, page } = request.query

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude,
    userLongitude,
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
