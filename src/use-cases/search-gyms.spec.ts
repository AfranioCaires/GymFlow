import { beforeEach, describe, expect, it } from 'vitest'

import type { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'

import { SearchGymsUseCase } from './search-gyms-use-case'

let gymsRepository: GymsRepository
let sut: SearchGymsUseCase

describe('SearchGymsUseCase gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    const gymData = {
      title: `gym_${crypto.randomUUID().substring(0, 10)}`,
      latitude: Math.random() * 10,
      longitude: Math.random() * 10,
    }

    await gymsRepository.create(gymData)
    const { gyms } = await sut.execute({ query: 'gym' })

    expect(gyms).toHaveLength(1)
    expect(gyms[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should be able to get a paginated gym seach', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `g${i}`,
        title: `gym_${crypto.randomUUID().substring(0, 9)}`,
        latitude: Math.random() * 10,
        longitude: Math.random() * 10,
      })
    }

    const { gyms } = await sut.execute({ query: 'gym', pagination: { page: 2 } })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'g21' }),
      expect.objectContaining({ id: 'g22' }),
    ])
  })
})
