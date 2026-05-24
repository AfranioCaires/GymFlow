import { ValidateCheckInUseCase } from '@/application/use-cases/check-ins/validate-check-in'

import { PrismaCheckInsRepository } from '../database/prisma/repositories/prisma-check-ins-repository'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
