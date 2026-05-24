import type { FastifyReply, FastifyRequest } from 'fastify'

import { MaxDistanceError } from '@/application/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/application/errors/max-number-of-check-ins-error'
import { makeCheckInUseCase } from '@/infra/factories/make-check-in-use-case'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'
import { catchError } from '@/util/error-catcher'

import type { CreateCheckInBodySchema, CreateCheckInParamsSchema } from './dto/check-ins.dto'

import '@fastify/jwt'

export async function create(
  request: FastifyRequest<{
    Params: CreateCheckInParamsSchema
    Body: CreateCheckInBodySchema
  }>,
  reply: FastifyReply,
) {
  const { gymId } = request.params
  const { userLatitude, userLongitude } = request.body

  const checkInUseCase = makeCheckInUseCase()

  const [error, data] = await catchError(
    checkInUseCase.execute({
      gymId,
      userId: request.user.sub,
      userLatitude,
      userLongitude,
    }),
    [MaxDistanceError, MaxNumberOfCheckInsError],
  )

  if (error) {
    return reply.status(HTTP_STATUS.BAD_REQUEST).send({ message: error.message })
  }

  const { checkIn } = data

  return reply.status(HTTP_STATUS.CREATED).send({
    checkIn: {
      id: checkIn.id,
      user_id: checkIn.userId,
      gym_id: checkIn.gymId,
      validated_at: checkIn.validatedAt,
      created_at: checkIn.createdAt,
    },
  })
}
