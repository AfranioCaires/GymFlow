import type { FastifyReply, FastifyRequest } from 'fastify'

import { CreateGymUseCaseFactory } from '@/use-cases/factories/make-create-gym-use-case'

import type { createGymBodySchema } from './dto'
import type { z } from 'zod'

export async function createGymController(
  request: FastifyRequest<{ Body: z.infer<typeof createGymBodySchema> }>,
  reply: FastifyReply,
) {
  const createGymUseCase = CreateGymUseCaseFactory.create()

  const { gym } = await createGymUseCase.execute(request.body)

  return reply.status(201).send({ gym })
}
