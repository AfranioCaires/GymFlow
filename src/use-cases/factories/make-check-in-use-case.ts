import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { GymsRepository } from '@/repositories/gyms-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CheckInUseCase } from '../check-in'

export class CheckInUseCaseFactory {
  static create() {
    const checkInRepository: CheckInsRepository = new PrismaCheckInsRepository()
    const gymsRepository: GymsRepository = new PrismaGymsRepository()
    return new CheckInUseCase(checkInRepository, gymsRepository)
  }
}
