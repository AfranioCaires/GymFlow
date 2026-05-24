import type { FastifyReply, FastifyRequest } from 'fastify'

import { UserAlreadyExistsError } from '@/application/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/infra/factories/make-register-use-case'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'
import { catchError } from '@/util/error-catcher'

import type { RegisterBodySchema } from './dto/users.dto'

export async function register(
  request: FastifyRequest<{ Body: RegisterBodySchema }>,
  reply: FastifyReply,
) {
  const { name, email, password } = request.body

  const registerUseCase = makeRegisterUseCase()

  const [error, data] = await catchError(
    registerUseCase.execute({
      name,
      email,
      password,
    }),
    [UserAlreadyExistsError],
  )

  if (error) {
    return reply.status(HTTP_STATUS.CONFLICT).send({ message: error.message })
  }

  const { user } = data

  return reply.status(HTTP_STATUS.CREATED).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
    },
  })
}
