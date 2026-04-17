import type { Pagination } from '@/config/pagination'
import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { CheckIn } from '@/generated/prisma/client'
import type { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

type FetchUserCheckInHistoryDto = {
  userId: string
  pagination?: Pagination
}

type FetchUserCheckInHitoryResponse = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHitoryUseCase extends BaseUseCase<
  FetchUserCheckInHistoryDto,
  FetchUserCheckInHitoryResponse
> {
  constructor(private readonly checkInRepository: PrismaCheckInsRepository) {
    super()
  }

  override async execute(
    data: FetchUserCheckInHistoryDto,
  ): Promise<FetchUserCheckInHitoryResponse> {
    const { userId, pagination } = data
    const checkIns = await this.checkInRepository.findManyByUserId({ userId, ...pagination })

    return { checkIns }
  }
}
