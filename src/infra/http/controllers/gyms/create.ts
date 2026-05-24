import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateGymUseCase } from '@/infra/factories/make-create-gym-use-case'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'

import type { CreateGymBodySchema } from './dto/gyms.dto'

export async function create(
  request: FastifyRequest<{ Body: CreateGymBodySchema }>,
  reply: FastifyReply,
) {
  const { title, description, phone, latitude, longitude } = request.body

  const createGymUseCase = makeCreateGymUseCase()

  const { gym } = await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(HTTP_STATUS.CREATED).send({
    gym: {
      id: gym.id,
      title: gym.title,
      description: gym.description,
      phone: gym.phone,
      latitude: gym.latitude,
      longitude: gym.longitude,
    },
  })
}
