import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { GetUserMetricsUseCase } from '../get-user-metrics'

export class GetUserMetricsUseCaseFactory {
  static create() {
    const checkInsRepository = new PrismaCheckInsRepository()
    return new GetUserMetricsUseCase(checkInsRepository)
  }
}
