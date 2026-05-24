import { beforeEach, describe, expect, it } from 'vitest'

import { CheckIn } from '@/domain/entities/check-in'
import { InMemoryCheckInsRepository } from '@/infra/database/in-memory/in-memory-check-ins-repository'

import { FetchUserCheckInHistoryUseCase } from './fetch-user-check-ins'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create(
      CheckIn.create({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    )

    await checkInsRepository.create(
      CheckIn.create({
        gymId: 'gym-02',
        userId: 'user-01',
      }),
    )

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create(
        CheckIn.create({
          gymId: `gym-${i}`,
          userId: 'user-01',
        }),
      )
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ])
  })
})
