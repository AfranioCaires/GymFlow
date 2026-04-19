import type { Pagination } from '@/config/pagination'
import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { Gym } from '@/generated/prisma/client'
import type { GymsRepository } from '@/repositories/gyms-repository'

type SearchGymsDto = {
  query: string
  pagination?: Pagination
}

type SearchGymsReponse = {
  gyms: Gym[]
}

export class SearchGymsUseCase extends BaseUseCase<SearchGymsDto, SearchGymsReponse> {
  constructor(private readonly gymsRepository: GymsRepository) {
    super()
  }

  override async execute(data: SearchGymsDto): Promise<SearchGymsReponse> {
    const { query, pagination } = data

    const gyms = await this.gymsRepository.findManyByTitle({ query, ...pagination })

    return { gyms }
  }
}
