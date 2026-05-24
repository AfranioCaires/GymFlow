import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/infra/database/in-memory/in-memory-gyms-repository'

import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      phone: '(31) 99999-9999',
      latitude: 23.5558,
      longitude: 46.6396,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
