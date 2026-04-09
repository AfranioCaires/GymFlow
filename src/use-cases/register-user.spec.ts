import bcrypt from 'bcrypt'
import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory.repository'
import type { UsersRepository } from '@/repositories/users.repository'

import { UserAlreadyExistsError } from './errors/user-already-exists.error'
import { RegisterUserUseCase } from './register-user'

describe('Register User use case', () => {
  let usersRepository: UsersRepository
  let sut: RegisterUserUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register a new user', async () => {
    const userData = {
      name: 'Arthur Morgan',
      email: 'arthur_morgan@exemplo.com',
      password: '123456',
    }

    const { user } = await sut.execute(userData)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register a user with an email that already exists', async () => {
    const userData = {
      name: 'Arthur Morgan',
      email: 'arthur_morgan@exemplo.com',
      password: '123456',
    }

    await sut.execute(userData)

    await expect(sut.execute(userData)).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should hash the user password upon registration', async () => {
    const userData = {
      name: 'Arthur Morgan',
      email: 'arthur_morgan@exemplo.com',
      password: '123456',
    }

    const { user } = await sut.execute(userData)

    const isPasswordCorrectlyHashed = await bcrypt.compare(userData.password, user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
