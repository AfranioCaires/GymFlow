import { CheckIn } from '@/domain/entities/check-in'
import type { CheckInsRepository } from '@/domain/repositories/check-ins-repository'

type FetchUserCheckInHistoryUseCaseRequest = {
  userId: string
  page: number
}

type FetchUserCheckInHistoryUseCaseResponse = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)
    return { checkIns }
  }
}
