import type { FastifyReply, FastifyRequest } from 'fastify'

import { catchError } from '@/util/error-catcher'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  const [error] = await catchError(request.jwtVerify())
  if (error) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
