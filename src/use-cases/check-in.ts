import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { CheckIn } from '@/generated/prisma/client'
import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/util/calculate-distance'

import { CheckInTwiceOnTheSameDayError } from './errors/check-twice-on-the-same-day'
import { DistanceNotAllowedError } from './errors/distance-not-allowed'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type CheckInUseCaseDto = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type CheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUseCase extends BaseUseCase<CheckInUseCaseDto, CheckInUseCaseResponse> {
  constructor(
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository,
  ) {
    super()
  }

  override async execute(data: CheckInUseCaseDto): Promise<CheckInUseCaseResponse> {
    const { userId, gymId, userLatitude, userLongitude } = data

    const gym = await this.gymsRepository.FindById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError('Gym')
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude, longitude: gym.longitude },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new DistanceNotAllowedError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) {
      throw new CheckInTwiceOnTheSameDayError()
    }

    const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId })
    return { checkIn }
  }
}
