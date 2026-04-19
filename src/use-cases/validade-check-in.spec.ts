import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInRepository: CheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate check in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate a check in', async () => {
    const unvalidatedCheckIn = await checkInRepository.create({
      id: crypto.randomUUID(),
      gym_id: crypto.randomUUID(),
      user_id: crypto.randomUUID(),
    })

    expect(unvalidatedCheckIn.validated_at).toBe(null)

    const { checkIn } = await sut.execute({ checkInId: unvalidatedCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() => sut.execute({ checkInId: crypto.randomUUID() })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should not be able to validate a check-in after 20 minutes', async () => {
    vi.setSystemTime(new Date(2026, 0, 1, 13, 0, 0))

    const unvalidatedCheckIn = await checkInRepository.create({
      id: crypto.randomUUID(),
      gym_id: crypto.randomUUID(),
      user_id: crypto.randomUUID(),
    })

    const TWENTY_ONE_MINUTES_IN_MS = 21 * 60 * 1000
    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS)

    await expect(() => sut.execute({ checkInId: unvalidatedCheckIn.id })).rejects.toBeInstanceOf(
      Error,
    )
  })
})
