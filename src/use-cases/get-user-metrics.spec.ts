import { beforeEach, describe, expect, it } from 'vitest'

import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: CheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get user metrics', async () => {
    const userId = crypto.randomUUID()

    await checkInRepository.create({ user_id: userId, gym_id: 'g1' })

    const { checkInsCount } = await sut.execute({ userId })

    expect(checkInsCount).toEqual(1)
  })
})
