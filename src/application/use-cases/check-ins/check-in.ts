import { MaxDistanceError } from '@/application/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/application/errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { CheckIn } from '@/domain/entities/check-in'
import type { CheckInsRepository } from '@/domain/repositories/check-ins-repository'
import type { GymsRepository } from '@/domain/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/util/calculate-distance'

type CheckInUseCaseRequest = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type CheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError('Gym')
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude, longitude: gym.longitude },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = CheckIn.create({
      gymId,
      userId,
    })

    await this.checkInsRepository.create(checkIn)

    return {
      checkIn,
    }
  }
}
