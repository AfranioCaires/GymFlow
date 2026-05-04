import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { CheckInUseCaseFactory } from '@/use-cases/factories/make-check-in-use-case'
import { catchError } from '@/util/error-catcher'

export async function createCheckInController(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.uuid(),
  })

  const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => Math.abs(value) <= 90),
    userLongitude: z.number().refine((value) => Math.abs(value) >= 180),
  })

  const createCheckInUseCase = CheckInUseCaseFactory.create()

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(request.body)

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
