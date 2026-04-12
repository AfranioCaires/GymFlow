import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositpry'

import { CheckInUseCase } from '../check-in'

export class CheckInUseCaseFactory {
  static create() {
    const checkInRepository: CheckInsRepository = new PrismaCheckInsRepository()
    return new CheckInUseCase(checkInRepository)
  }
}
