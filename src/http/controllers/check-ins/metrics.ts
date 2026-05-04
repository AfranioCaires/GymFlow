import type { FastifyReply, FastifyRequest } from 'fastify'

import { GetUserMetricsUseCaseFactory } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function getUserCheckInMetricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetricsUseCase = GetUserMetricsUseCaseFactory.create()
  const { checkInsCount } = await getUserMetricsUseCase.execute({ userId: request.user.sub })

  return reply.status(200).send({ checkInsCount })
}
