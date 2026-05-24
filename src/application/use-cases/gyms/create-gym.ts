import { Gym } from '@/domain/entities/gym'
import type { GymsRepository } from '@/domain/repositories/gyms-repository'

type CreateGymUseCaseRequest = {
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

type CreateGymUseCaseResponse = {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = Gym.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    await this.gymsRepository.create(gym)

    return {
      gym,
    }
  }
}
