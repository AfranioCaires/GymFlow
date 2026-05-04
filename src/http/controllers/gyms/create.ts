import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CreateGymUseCaseFactory } from '@/use-cases/factories/make-create-gym-use-case'

export async function createGymController(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const createGymUseCase = CreateGymUseCaseFactory.create()

  const input = createGymBodySchema.parse(request.body)

  const { gym } = await createGymUseCase.execute(input)

  return reply.status(201).send({ gym })
}
