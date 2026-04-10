import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { GetUserProfileUseCase } from '../get-user-profile'

export class GetUserProfileUseCaseFactory {
  static create() {
    const userRepository = new PrismaUsersRepository()
    return new GetUserProfileUseCase(userRepository)
  }
}
