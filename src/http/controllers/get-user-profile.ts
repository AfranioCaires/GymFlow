import type { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { GetUserProfileUseCaseFactory } from '@/use-cases/factories/make-get-user-profile-use-case'
import { catchError } from '@/util/error-catcher'

export async function getUserProfileController(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = GetUserProfileUseCaseFactory.create()

  const [error, user] = await catchError(
    getUserProfileUseCase.execute({ userId: request.user.sub }),
    [ResourceNotFoundError],
  )

  if (error) {
    return reply.status(404).send({ message: error.message })
  }

  return reply.status(200).send(user)
}
