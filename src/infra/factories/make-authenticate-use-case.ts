import { AuthenticateUseCase } from '@/application/use-cases/users/authenticate'

import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
