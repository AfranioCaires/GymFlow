import type { FastifyReply, FastifyRequest } from 'fastify'

import { FetchUserCheckInHistoryUseCaseFactory } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case'

import type { CheckInHistoryQuerySchema } from './dto/check-ins.dto'

export async function fetchUserCheckInHistoryController(
  request: FastifyRequest<{ Querystring: CheckInHistoryQuerySchema }>,
  reply: FastifyReply,
) {
  const checkInHistoryUseCase = FetchUserCheckInHistoryUseCaseFactory.create()

  const { checkIns } = await checkInHistoryUseCase.execute({
    pagination: request.query,
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkIns })
}
