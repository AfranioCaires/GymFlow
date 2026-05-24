import { FetchNearbyGymsUseCase } from '@/application/use-cases/gyms/fetch-nearby-gyms'

import { PrismaGymsRepository } from '../database/prisma/repositories/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
