import { FetchUserCheckInHistoryUseCase } from '@/application/use-cases/check-ins/fetch-user-check-ins'

import { PrismaCheckInsRepository } from '../database/prisma/repositories/prisma-check-ins-repository'

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository)

  return useCase
}
