import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { CheckInsRepository } from '@/repositories/check-ins-repository'

type GetUserMetricsDTO = {
  userId: string
}

type GetUserMetricsUseCaseResponse = {
  checkInsCount: number
}

export class GetUserMetricsUseCase extends BaseUseCase<
  GetUserMetricsDTO,
  GetUserMetricsUseCaseResponse
> {
  constructor(private readonly checkInsRepository: CheckInsRepository) {
    super()
  }

  override async execute(data: GetUserMetricsDTO): Promise<GetUserMetricsUseCaseResponse> {
    const { userId } = data
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)
    return { checkInsCount }
  }
}
