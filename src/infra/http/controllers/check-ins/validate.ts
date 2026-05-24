import type { FastifyReply, FastifyRequest } from 'fastify'

import { CheckInTimeLimitError } from '@/application/errors/check-in-time-limit-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeValidateCheckInUseCase } from '@/infra/factories/make-validate-check-in-use-case'
import { HTTP_STATUS } from '@/infra/http/constants/http-status-codes'
import { catchError } from '@/util/error-catcher'

import type { ValidateCheckInParamsSchema } from './dto/check-ins.dto'

export async function validate(
  request: FastifyRequest<{ Params: ValidateCheckInParamsSchema }>,
  reply: FastifyReply,
) {
  const { checkInId } = request.params

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  const [error] = await catchError(
    validateCheckInUseCase.execute({
      checkInId,
    }),
    [ResourceNotFoundError, CheckInTimeLimitError],
  )

  if (error) {
    const { message } = error

    if (error instanceof ResourceNotFoundError) {
      return reply.status(HTTP_STATUS.NOT_FOUND).send({ message })
    }

    return reply.status(HTTP_STATUS.BAD_REQUEST).send({ message })
  }

  return reply.status(HTTP_STATUS.NO_CONTENT).send()
}
