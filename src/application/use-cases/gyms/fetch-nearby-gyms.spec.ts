import { beforeEach, describe, expect, it } from 'vitest'

import { Gym } from '@/domain/entities/gym'
import { InMemoryGymsRepository } from '@/infra/database/in-memory/in-memory-gyms-repository'

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create(
      Gym.create({
        title: 'Near Gym',
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      }),
    )

    await gymsRepository.create(
      Gym.create({
        title: 'Far Gym',
        description: null,
        phone: null,
        latitude: -27.0615922,
        longitude: -49.5229501,
      }),
    )

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms[0]?.title).toBe('Near Gym')
  })

  it('should be able to fetch paginated nearby gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create(
        Gym.create({
          title: `Near Gym ${i}`,
          description: null,
          phone: null,
          latitude: -27.2092052,
          longitude: -49.6401091,
        }),
      )
    }

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms[0]?.title).toBe('Near Gym 21')
    expect(gyms[1]?.title).toBe('Near Gym 22')
  })
})
