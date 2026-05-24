import type { FastifyReply, FastifyRequest } from 'fastify'

import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'

import '@fastify/jwt'
import '@fastify/cookie'

export async function refreshToken(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
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
