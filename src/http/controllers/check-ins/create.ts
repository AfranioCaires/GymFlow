import type { FastifyReply, FastifyRequest } from 'fastify'

import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { CheckInUseCaseFactory } from '@/use-cases/factories/make-check-in-use-case'
import { catchError } from '@/util/error-catcher'

import type { createCheckInBodySchema, createCheckInParamsSchema } from './schemas'
import type { z } from 'zod'

export async function createCheckInController(
  request: FastifyRequest<{
    Params: z.infer<typeof createCheckInParamsSchema>
    Body: z.infer<typeof createCheckInBodySchema>
  }>,
  reply: FastifyReply,
) {
  const { gymId } = request.params
  const { userLatitude, userLongitude } = request.body

  const createCheckInUseCase = CheckInUseCaseFactory.create()

  const [error, data] = await catchError(
    createCheckInUseCase.execute({
      gymId,
      userLatitude,
      userLongitude,
      userId: request.user.sub,
    }),
    [MaxDistanceError, ResourceNotFoundError, MaxNumberOfCheckInsError],
  )

  if (error) {
    return reply.status(400).send({ message: error.message })
  }

  const { checkIn } = data

  return reply.status(201).send({ checkIn })
}
