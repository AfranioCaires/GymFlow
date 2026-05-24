import bcrypt from 'bcrypt'

import { UserAlreadyExistsError } from '@/application/errors/user-already-exists-error'
import { User } from '@/domain/entities/user'
import type { UsersRepository } from '@/domain/repositories/users-repository'

type RegisterUseCaseRequest = {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await bcrypt.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = User.create({
      name,
      email,
      passwordHash,
    })

    await this.usersRepository.create(user)

    return {
      user,
    }
  }
}
