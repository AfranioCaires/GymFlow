import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { AuthenticateUserUseCase } from '../authenticate'

export class AuthenticateUseCaseFactory {
  static create() {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUserUseCase(usersRepository)

    return authenticateUseCase
  }
}
