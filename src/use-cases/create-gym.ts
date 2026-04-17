import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { Gym } from '@/generated/prisma/client'
import type { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

type CreateGymDto = {
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

type CreateGymCaseResponse = {
  gym: Gym
}

export class CreateGymUseCase extends BaseUseCase<CreateGymDto, CreateGymCaseResponse> {
  constructor(private readonly gymsRepository: PrismaGymsRepository) {
    super()
  }

  override async execute(data: CreateGymDto): Promise<CreateGymCaseResponse> {
    const gym = await this.gymsRepository.create(data)

    return { gym }
  }
}
