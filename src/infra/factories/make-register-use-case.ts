import { RegisterUseCase } from '@/application/use-cases/users/register-user'

import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(usersRepository)

  return useCase
}
