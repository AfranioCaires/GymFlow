import { CheckInUseCase } from '@/application/use-cases/check-ins/check-in'

import { PrismaCheckInsRepository } from '../database/prisma/repositories/prisma-check-ins-repository'
import { PrismaGymsRepository } from '../database/prisma/repositories/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
