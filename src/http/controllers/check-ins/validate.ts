import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CheckInTimeLimitError } from '@/use-cases/errors/check-in-time-limit-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { ValidateCheckInUseCaseFactory } from '@/use-cases/factories/make-validate-check-in-use-case'
import { catchError } from '@/util/error-catcher'

export async function validateCheckInController(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.uuid(),
  })

  const validateCheckInUseCase = ValidateCheckInUseCaseFactory.create()

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const [error] = await catchError(validateCheckInUseCase.execute({ checkInId }), [
    CheckInTimeLimitError,
    ResourceNotFoundError,
  ])

  if (error) {
    return reply.status(400).send({ message: error.message })
  }

  return reply.status(204).send()
}
