import bcrypt from 'bcrypt'

import type { User } from '@/generated/prisma/client'
import type { UsersRepository } from '@/repositories/users.repository'

import { InvalidCredentialsError } from './errors/invalid-credentials.error'

type AuthenticateUserDto = {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(data: AuthenticateUserDto): Promise<AuthenticateUserUseCaseResponse> {
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
