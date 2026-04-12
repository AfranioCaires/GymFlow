import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { User } from '@/generated/prisma/client'
import type { UsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetUserProfileUseCaseDto = {
  userId: string
}

type GetUserProfileUseCaseResponse = {
  user: User
}

export class GetUserProfileUseCase extends BaseUseCase<
  GetUserProfileUseCaseDto,
  GetUserProfileUseCaseResponse
> {
  constructor(private readonly usersRepository: UsersRepository) {
    super()
  }

  override async execute({
    userId,
  }: GetUserProfileUseCaseDto): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError('User')
    }

    return { user }
  }
}
