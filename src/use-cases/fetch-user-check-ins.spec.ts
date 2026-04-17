import { beforeEach, describe, expect, it } from 'vitest'

import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { FetchUserCheckInHitoryUseCase } from './fetch-user-check-ins'

let checkInRepository: CheckInsRepository
let sut: FetchUserCheckInHitoryUseCase

describe('Fetch user check-in use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInHitoryUseCase(checkInRepository)
  })

  it('should be able to fetch user check-in history', async () => {
    const userId = crypto.randomUUID()

    await checkInRepository.create({ user_id: userId, gym_id: 'g1' })
    await checkInRepository.create({ user_id: userId, gym_id: 'g2' })

    const { checkIns } = await sut.execute({ userId })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'g1' }),
      expect.objectContaining({ gym_id: 'g2' }),
    ])
  })

  it('should be able to fetch a paginated user check-in history', async () => {
    const userId = crypto.randomUUID()

    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({ user_id: userId, gym_id: `g${i}` })
    }

    const { checkIns } = await sut.execute({ userId, pagination: { page: 2 } })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'g21' }),
      expect.objectContaining({ gym_id: 'g22' }),
    ])
  })
})
