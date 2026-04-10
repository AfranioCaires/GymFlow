import bcrypt from 'bcrypt'

import { BaseUseCase } from '@/domain/use-cases/base-use-case'
import { type User } from '@/generated/prisma/client'
import type { UsersRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

type RegisterUserDto = {
  name: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse = {
  user: User
}

export class RegisterUserUseCase extends BaseUseCase<RegisterUserDto, RegisterUserUseCaseResponse> {
  constructor(private readonly usersRepository: UsersRepository) {
    super()
  }

  async execute(data: RegisterUserDto): Promise<RegisterUserUseCaseResponse> {
    const { name, email, password } = data
    const password_hash = await bcrypt.hash(password, 6)
    const existingUser = await this.usersRepository.findByEmail(email)

    if (existingUser) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
