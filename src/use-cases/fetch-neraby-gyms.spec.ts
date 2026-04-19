import { beforeEach, describe, expect, it } from 'vitest'

import type { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: GymsRepository
let sut: FetchNearbyGymsUseCase

describe('SearchNearbyGymsUseCase gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch for nearby gyms', async () => {
    const gymData = {
      title: `gym_${crypto.randomUUID().substring(0, 10)}`,
      latitude: -23.5505,
      longitude: -46.6333,
    }
    await gymsRepository.create(gymData)

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should be able to get a paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `g${i}`,
        title: `gym_${crypto.randomUUID().substring(0, 9)}`,
        latitude: -23.5505 + (Math.random() * 0.01 - 0.005),
        longitude: -46.6333 + (Math.random() * 0.01 - 0.005),
      })
    }

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
      pagination: { page: 2, limit: 20 },
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'g21' }),
      expect.objectContaining({ id: 'g22' }),
    ])
  })

  it('should not fetch gyms far away', async () => {
    await gymsRepository.create({
      id: 'g1',
      title: 'gym_far',
      latitude: -23.9505,
      longitude: -46.6333,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })

    expect(gyms).toHaveLength(0)
  })
})
