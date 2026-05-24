import type { FastifyReply, FastifyRequest } from 'fastify'

import { InvalidCredentialsError } from '@/application/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/infra/factories/make-authenticate-use-case'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'
import { catchError } from '@/util/error-catcher'

import type { AuthenticateBodySchema } from './dto/users.dto'

import '@fastify/jwt'
import '@fastify/cookie'

export async function authenticate(
  request: FastifyRequest<{ Body: AuthenticateBodySchema }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body

  const authenticateUseCase = makeAuthenticateUseCase()

  const [error, data] = await catchError(
    authenticateUseCase.execute({
      email,
      password,
    }),
    [InvalidCredentialsError],
  )

  if (error) {
    return reply.status(HTTP_STATUS.BAD_REQUEST).send({ message: error.message })
  }

  const { user } = data

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
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
    .status(HTTP_STATUS.OK)
    .send({
      token,
    })
}
