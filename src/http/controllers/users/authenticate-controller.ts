import type { FastifyReply, FastifyRequest } from 'fastify'
import type { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { AuthenticateUseCaseFactory } from '@/use-cases/factories/make-authenticate-use-case'
import { catchError } from '@/util/error-catcher'

import type { authenticateBodySchema } from './dto'

export async function authenticateController(
  request: FastifyRequest<{ Body: z.infer<typeof authenticateBodySchema> }>,
  reply: FastifyReply,
) {
  const authenticateUserUseCase = AuthenticateUseCaseFactory.create()

  const [error, data] = await catchError(authenticateUserUseCase.execute(request.body), [
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

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: data.user.id,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
