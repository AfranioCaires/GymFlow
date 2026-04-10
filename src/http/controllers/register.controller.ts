import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error'
import { RegisterUserUseCaseFactory } from '@/use-cases/factories/make-register-user-use-case'
import { catchError } from '@/util/error-catcher'

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const registerUserUseCase = RegisterUserUseCaseFactory.create()

  const data = registerBodySchema.parse(request.body)

  const [error, user] = await catchError(registerUserUseCase.execute(data), [
    UserAlreadyExistsError,
  ])

  if (error) {
    return reply.status(409).send({ message: error.message })
  }

  return reply.status(201).send(user)
}
