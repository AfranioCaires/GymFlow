import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CreateGymUseCase } from '../create-gym'

export class CreateGymUseCaseFactory {
  static create() {
    const gymsRepository = new PrismaGymsRepository()
    return new CreateGymUseCase(gymsRepository)
  }
}
