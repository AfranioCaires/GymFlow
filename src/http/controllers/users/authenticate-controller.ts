import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { AuthenticateUseCaseFactory } from '@/use-cases/factories/make-authenticate-use-case'
import { catchError } from '@/util/error-catcher'

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const authenticateUserUseCase = AuthenticateUseCaseFactory.create()

  const input = authenticateBodySchema.parse(request.body)

  const [error, data] = await catchError(authenticateUserUseCase.execute(input), [
    InvalidCredentialsError,
  ])

  if (error) {
    return reply.status(400).send({ message: error.message })
  }

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: data.user.id,
      },
    },
  )

  return reply.status(200).send({ token })
}
