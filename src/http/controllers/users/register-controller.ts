import type { FastifyReply, FastifyRequest } from 'fastify'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUserUseCaseFactory } from '@/use-cases/factories/make-register-user-use-case'
import { catchError } from '@/util/error-catcher'

import type { RegisterBodySchema } from './dto/users.dto'

export async function registerController(
  request: FastifyRequest<{ Body: RegisterBodySchema }>,
  reply: FastifyReply,
) {
  const registerUserUseCase = RegisterUserUseCaseFactory.create()

  const [error, user] = await catchError(registerUserUseCase.execute(request.body), [
    UserAlreadyExistsError,
  ])

  if (error) {
    return reply.status(409).send({ message: error.message })
  }

  return reply.status(201).send(user)
}
