import { expect, it, describe, beforeEach } from 'vitest'

import type { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'

import { CreateGymUseCase } from './create-gym'

let usersRepository: GymsRepository
let sut: CreateGymUseCase

describe('Create gym use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(usersRepository)
  })

  it('should be able to create a new gym', async () => {
    const gymData = {
      title: 'Gym',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      phone: '(31) 99999-9999',
      latitude: 23.5558,
      longitude: 46.6396,
    }

    const { gym } = await sut.execute(gymData)

    expect(gym.id).toEqual(expect.any(String))
  })

  //   it('should not be able to create a new gym with invalid ', async () => {
  //   })
})
