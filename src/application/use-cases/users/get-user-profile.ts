import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { User } from '@/domain/entities/user'
import type { UsersRepository } from '@/domain/repositories/users-repository'

type GetUserProfileUseCaseRequest = {
  userId: string
}

type GetUserProfileUseCaseResponse = {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError('User')
    }

    return {
      user,
    }
  }
}
