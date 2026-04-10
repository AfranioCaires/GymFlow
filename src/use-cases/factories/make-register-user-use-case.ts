import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { RegisterUserUseCase } from '../register-user'

export class RegisterUserUseCaseFactory {
  static create() {
    const userRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)

    return registerUserUseCase
  }
}
