import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchUserCheckInHistoryUseCase } from '@/infra/factories/make-fetch-user-check-ins-history-use-case'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'

import type { CheckInHistoryQuerySchema } from './dto/check-ins.dto'

import '@fastify/jwt'

export async function history(
  request: FastifyRequest<{ Querystring: CheckInHistoryQuerySchema }>,
  reply: FastifyReply,
) {
  const { page } = request.query

  const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInHistoryUseCase()

  const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(HTTP_STATUS.OK).send({
    checkIns: checkIns.map((checkIn) => ({
      id: checkIn.id,
      gym_id: checkIn.gymId,
      user_id: checkIn.userId,
      validated_at: checkIn.validatedAt,
      created_at: checkIn.createdAt,
    })),
  })
}
