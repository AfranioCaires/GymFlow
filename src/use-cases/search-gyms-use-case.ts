import type { Pagination } from '@/config/pagination'
import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { Gym } from '@/generated/prisma/client'
import type { GymsRepository } from '@/repositories/gyms-repository'

type SearchGymsDto = {
  query: string
  pagination?: Pagination
}

type CreateGymCaseResponse = {
  gyms: Gym[]
}

export class CreateGymUseCase extends BaseUseCase<SearchGymsDto, CreateGymCaseResponse> {
  constructor(private readonly gymsRepository: GymsRepository) {
    super()
  }

  override async execute(data: SearchGymsDto): Promise<CreateGymCaseResponse> {
    const gyms = await this.gymsRepository.findManyByTitle(data)

    return { gyms }
  }
}
