import bcrypt from 'bcrypt'
import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory.repository'
import type { UsersRepository } from '@/repositories/users.repository'

import { AuthenticateUserUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

describe('Authenticate User use case', () => {
  let usersRepository: UsersRepository
  let sut: AuthenticateUserUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })

  it('should be able to authenticate a user with correct credentials', async () => {
    const userData = {
      email: 'arthur_morgan@exemplo.com',
      password: '123456',
    }

    await usersRepository.create({
      name: 'Arthur Morgan',
      email: userData.email,
      password_hash: await bcrypt.hash(userData.password, 6),
    })

    const { user } = await sut.execute(userData)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a user with wrong email', async () => {
    const userData = {
      email: 'arthur_morgan@exemplo.com',
      password: '123456',
    }

    await expect(() => sut.execute(userData)).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a user with wrong password', async () => {
    const userData = {
      email: 'arthur_morgan@exemplo.com',
      password: 'wrongpassword',
    }

    await expect(() => sut.execute(userData)).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
