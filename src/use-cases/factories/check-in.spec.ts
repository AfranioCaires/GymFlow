import { beforeEach, describe, expect, it } from 'vitest'

import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { CheckInUseCase } from '../check-in'

let checkInRepository: CheckInsRepository
let sut: CheckInUseCase

describe('Check in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should be able to check in', async () => {
    const checkInData = {
      userId: crypto.randomUUID(),
      gymId: crypto.randomUUID(),
    }

    const { checkIn } = await sut.execute(checkInData)

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
