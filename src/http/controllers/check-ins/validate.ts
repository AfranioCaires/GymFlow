import type { FastifyReply, FastifyRequest } from 'fastify'

import { CheckInTimeLimitError } from '@/use-cases/errors/check-in-time-limit-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { ValidateCheckInUseCaseFactory } from '@/use-cases/factories/make-validate-check-in-use-case'
import { catchError } from '@/util/error-catcher'

import type { validateCheckInParamsSchema } from './dto'
import type { z } from 'zod'

export async function validateCheckInController(
  request: FastifyRequest<{ Params: z.infer<typeof validateCheckInParamsSchema> }>,
  reply: FastifyReply,
) {
  const { checkInId } = request.params

  const validateCheckInUseCase = ValidateCheckInUseCaseFactory.create()

  const [error] = await catchError(validateCheckInUseCase.execute({ checkInId }), [
    CheckInTimeLimitError,
    ResourceNotFoundError,
  ])

  if (error) {
    return reply.status(400).send({ message: error.message })
  }

  return reply.status(204).send()
}
