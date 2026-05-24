import { GetUserMetricsUseCase } from '@/application/use-cases/check-ins/get-user-metrics'

import { PrismaCheckInsRepository } from '../database/prisma/repositories/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
