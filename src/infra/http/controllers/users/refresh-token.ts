import type { FastifyReply, FastifyRequest } from 'fastify'
import '@fastify/jwt'
import '@fastify/cookie'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'

import { getUserTokens } from './shared/tokens'

export async function refreshToken(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const { role, sub } = request.user

  const { token, refreshToken } = await getUserTokens({ id: sub, role, reply })

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
