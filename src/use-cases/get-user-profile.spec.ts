import bcrypt from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import type { UsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile'

let userRepository: UsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should retrieve the user profile successfully', async () => {
    const userData = {
      name: 'Arthur Morgan',
      email: 'arthur_morgan@exemplo.com',
      password: '123456',
    }

    const { id } = await userRepository.create({
      name: userData.name,
      email: userData.email,
      password_hash: await bcrypt.hash(userData.password, 6),
    })

    const { user } = await sut.execute({ userId: id })

    expect(user.id).toEqual(id)
  })

  it('should handle errors when retrieving a non-existent user profile', async () => {
    await expect(() => sut.execute({ userId: 'non-existent-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
