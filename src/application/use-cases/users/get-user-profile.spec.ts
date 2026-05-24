import bcrypt from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { User } from '@/domain/entities/user'
import { InMemoryUsersRepository } from '@/infra/database/in-memory/in-memory-users-repository'

import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await bcrypt.hash('123456', 6),
    })

    await usersRepository.create(createdUser)

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toBe('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
