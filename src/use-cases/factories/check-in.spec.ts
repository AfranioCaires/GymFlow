import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { CheckInUseCase } from '../check-in'

let checkInRepository: CheckInsRepository
let sut: CheckInUseCase

describe('Check in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2026, 0, 1, 8, 0, 0))

    const checkInData = {
      userId: crypto.randomUUID(),
      gymId: crypto.randomUUID(),
    }

    const { checkIn } = await sut.execute(checkInData)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    const checkInData = {
      userId: crypto.randomUUID(),
      gymId: crypto.randomUUID(),
    }

    await sut.execute(checkInData)

    await expect(() => sut.execute(checkInData)).rejects.toBeInstanceOf(Error)
  })

  it('should be abre to check in diffent days', async () => {
    vi.setSystemTime(new Date(2026, 0, 1, 8, 0, 0))

    const checkInData = {
      userId: crypto.randomUUID(),
      gymId: crypto.randomUUID(),
    }

    await sut.execute(checkInData)

    vi.setSystemTime(new Date(2026, 0, 2, 8, 0, 0))

    const { checkIn } = await sut.execute(checkInData)

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
