import { SearchGymsUseCase } from '@/application/use-cases/gyms/search-gyms'

import { PrismaGymsRepository } from '../database/prisma/repositories/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
