import { GetUserProfileUseCase } from '@/application/use-cases/users/get-user-profile'

import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users-repository'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
