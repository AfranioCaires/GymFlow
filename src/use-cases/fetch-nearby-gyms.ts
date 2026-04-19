import type { Pagination } from '@/config/pagination'
import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { Gym } from '@/generated/prisma/client'
import type { GymsRepository } from '@/repositories/gyms-repository'

export type FetchNeabyGymsDto = {
  userLatitude: number
  userLongitude: number
  pagination?: Pagination
}

type FetchNearbyGymsResponse = {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase extends BaseUseCase<
  FetchNeabyGymsDto,
  FetchNearbyGymsResponse
> {
  constructor(private readonly gymsRepository: GymsRepository) {
    super()
  }

  override async execute(data: FetchNeabyGymsDto): Promise<FetchNearbyGymsResponse> {
    const { userLatitude, userLongitude, pagination } = data

    const gyms = await this.gymsRepository.findManyNearby({
      userLatitude,
      userLongitude,
      ...pagination,
    })

    return { gyms }
  }
}
