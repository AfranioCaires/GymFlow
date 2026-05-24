import { beforeEach, describe, expect, it } from 'vitest'

import { CheckIn } from '@/domain/entities/check-in'
import { InMemoryCheckInsRepository } from '@/infra/database/in-memory/in-memory-check-ins-repository'

import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
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

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toBe(2)
  })
})
