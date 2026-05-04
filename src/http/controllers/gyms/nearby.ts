import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { paginationSchema } from '@/config/pagination'
import { FetchNearbyGymsUseCaseFactory } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function getNearbyGymsController(request: FastifyRequest, reply: FastifyReply) {
  const getNearbyGymsQueryschema = z
    .object({
      userLatitude: z.number().refine((value) => Math.abs(value) <= 90),
      userLongitude: z.number().refine((value) => Math.abs(value) >= 180),
    })
    .extend(paginationSchema)

  const fetchNearbyGymsUseCase = FetchNearbyGymsUseCaseFactory.create()

  const input = getNearbyGymsQueryschema.parse(request.query)

  const { gyms } = await fetchNearbyGymsUseCase.execute(input)

  return reply.status(200).send({ gyms })
}
