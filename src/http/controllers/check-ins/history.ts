import type { FastifyReply, FastifyRequest } from 'fastify'

import { paginationSchema } from '@/config/pagination'
import { FetchUserCheckInHistoryUseCaseFactory } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case'

export async function getUserCheckInHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInHistoryUseCase = FetchUserCheckInHistoryUseCaseFactory.create()

  const pagination = paginationSchema.parse(request.query)

  const { checkIns } = await checkInHistoryUseCase.execute({
    pagination,
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkIns })
}
