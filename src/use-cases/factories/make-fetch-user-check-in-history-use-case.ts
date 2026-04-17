import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { FetchUserCheckInHitoryUseCase } from '../fetch-user-check-ins'

export class FetchUserCheckInHistoryUseCaseFactory {
  static create() {
    const checkInRepository: CheckInsRepository = new PrismaCheckInsRepository()
    return new FetchUserCheckInHitoryUseCase(checkInRepository)
  }
}
