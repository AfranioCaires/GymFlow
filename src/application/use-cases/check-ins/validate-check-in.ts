import { CheckInTimeLimitError } from '@/application/errors/check-in-time-limit-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { CheckIn } from '@/domain/entities/check-in'
import type { CheckInsRepository } from '@/domain/repositories/check-ins-repository'
import { DateUtils } from '@/util/date-utils'

type ValidateCheckInUseCaseRequest = {
  checkInId: string
}

type ValidateCheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError('Check-in')
    }

    const distanceInMinutesFromCheckInCreation =
      Math.abs(DateUtils.diff(new Date(), checkIn.createdAt ?? new Date())) / 1000 / 60

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new CheckInTimeLimitError()
    }

    checkIn.validate()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
