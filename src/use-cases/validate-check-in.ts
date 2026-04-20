import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { CheckIn } from '@/generated/prisma/client'
import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import { DateUtils } from '@/util/date-utils'

import { CheckInTimeLimitError } from './errors/check-in-time-limit-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type ValidateCheckInUseCaseDto = {
  checkInId: string
}

type ValidateCheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase extends BaseUseCase<
  ValidateCheckInUseCaseDto,
  ValidateCheckInUseCaseResponse
> {
  constructor(private readonly checkInsRepository: CheckInsRepository) {
    super()
  }

  override async execute(data: ValidateCheckInUseCaseDto): Promise<ValidateCheckInUseCaseResponse> {
    const { checkInId } = data

    const existingCheckIn = await this.checkInsRepository.findById(checkInId)

    if (!existingCheckIn) {
      throw new ResourceNotFoundError('CheckIn')
    }

    const distanceInMinutesFromCheckInCreationAndNow = Math.abs(
      DateUtils.diff(new Date(), existingCheckIn.created_at) / 1000 / 60,
    )

    const twentyMinutes = 20

    if (distanceInMinutesFromCheckInCreationAndNow > twentyMinutes) {
      throw new CheckInTimeLimitError()
    }

    existingCheckIn.validated_at = new Date()

    const checkIn = await this.checkInsRepository.save(existingCheckIn)

    return { checkIn }
  }
}
