import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { ValidateCheckInUseCase } from '../validate-check-in'

export class ValidateCheckInUseCaseFactory {
  static create() {
    const checkInsRepository = new PrismaCheckInsRepository()
    return new ValidateCheckInUseCase(checkInsRepository)
  }
}
