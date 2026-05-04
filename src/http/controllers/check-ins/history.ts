import type { FastifyReply, FastifyRequest } from 'fastify'

import { FetchUserCheckInHistoryUseCaseFactory } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case'

import type { checkInHistoryQuerySchema } from './dto'
import type { z } from 'zod'

export async function getUserCheckInHistoryController(
  request: FastifyRequest<{ Querystring: z.infer<typeof checkInHistoryQuerySchema> }>,
  reply: FastifyReply,
) {
  const checkInHistoryUseCase = FetchUserCheckInHistoryUseCaseFactory.create()

  const { checkIns } = await checkInHistoryUseCase.execute({
    pagination: request.query,
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkIns })
}
