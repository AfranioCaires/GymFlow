import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserMetricsUseCase } from '@/infra/factories/make-get-user-metrics-use-case'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'

import '@fastify/jwt'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(HTTP_STATUS.OK).send({
    checkInsCount,
  })
}
