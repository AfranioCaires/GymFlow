import bcrypt from 'bcrypt'

import { InvalidCredentialsError } from '@/application/errors/invalid-credentials-error'
import { User } from '@/domain/entities/user'
import type { UsersRepository } from '@/domain/repositories/users-repository'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.passwordHash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
