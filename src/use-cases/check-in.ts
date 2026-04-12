import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { CheckIn } from '@/generated/prisma/client'
import type { CheckInsRepository } from '@/repositories/check-ins-repository'

type CheckInUseCaseDto = {
  userId: string
  gymId: string
}

type CheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUseCase extends BaseUseCase<CheckInUseCaseDto, CheckInUseCaseResponse> {
  constructor(private readonly checkInsRepository: CheckInsRepository) {
    super()
  }

  override async execute(data: CheckInUseCaseDto): Promise<CheckInUseCaseResponse> {
    const { userId, gymId } = data

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId })
    return { checkIn }
  }
}
