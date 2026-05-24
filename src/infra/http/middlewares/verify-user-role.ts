import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'

import type { UserRoles } from '@/domain/entities/user'

import { HTTP_STATUS } from '../constants/http-status-codes'

export function verifyUserRole(roleToVerify: UserRoles) {
  return async <T extends RouteGenericInterface>(
    request: FastifyRequest<T>,
    reply: FastifyReply,
  ) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.code(HTTP_STATUS.FORBIDDEN).send({ message: 'Unauthorized.' })
    }
  }
}
