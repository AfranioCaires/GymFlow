import { CreateGymUseCase } from '@/application/use-cases/gyms/create-gym'

import { PrismaGymsRepository } from '../database/prisma/repositories/prisma-gyms-repository'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
