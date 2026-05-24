import type { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetUserProfileUseCase } from '@/infra/factories/make-get-user-profile-use-case'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'
import { catchError } from '@/util/error-catcher'

import '@fastify/jwt'

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const [error, data] = await catchError(
    getUserProfileUseCase.execute({
      userId: request.user.sub,
    }),
    [ResourceNotFoundError],
  )

  if (error) {
    return reply.status(HTTP_STATUS.NOT_FOUND).send({ message: error.message })
  }

  const { user } = data

  return reply.status(HTTP_STATUS.OK).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
    },
  })
}
