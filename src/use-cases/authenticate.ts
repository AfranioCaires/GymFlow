import bcrypt from 'bcrypt'

import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import type { User } from '@/generated/prisma/client'
import type { UsersRepository } from '@/repositories/users-repository'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'

type AuthenticateUserDto = {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = {
  user: User
}

export class AuthenticateUserUseCase extends BaseUseCase<
  AuthenticateUserDto,
  AuthenticateUserUseCaseResponse
> {
  constructor(private readonly usersRepository: UsersRepository) {
    super()
  }

  override async execute(data: AuthenticateUserDto): Promise<AuthenticateUserUseCaseResponse> {
    const { email, password } = data

    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordCorrectlyHashed = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordCorrectlyHashed) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
