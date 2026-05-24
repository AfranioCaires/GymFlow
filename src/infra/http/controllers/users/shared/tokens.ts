import type { FastifyReply } from 'fastify'

import type { UserRoles } from '@/domain/entities/user'

export async function getUserTokens({
  id,
  role,
  reply,
}: {
  id: string
  role: UserRoles
  reply: FastifyReply
}) {
  const token = await reply.jwtSign({ role }, { sign: { sub: id } })
  const refreshToken = await reply.jwtSign({ role }, { sign: { sub: id, expiresIn: '7d' } })

  return { token, refreshToken }
}
