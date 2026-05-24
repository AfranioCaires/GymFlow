import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CheckInTimeLimitError } from '@/application/errors/check-in-time-limit-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { CheckIn } from '@/domain/entities/check-in'
import { InMemoryCheckInsRepository } from '@/infra/database/in-memory/in-memory-check-ins-repository'

import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const checkIn = CheckIn.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await checkInsRepository.create(checkIn)

    await sut.execute({
      checkInId: checkIn.id,
    })

    const validatedCheckIn = checkInsRepository.items[0]

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(validatedCheckIn?.validatedAt).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const checkIn = CheckIn.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await checkInsRepository.create(checkIn)

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: checkIn.id,
      }),
    ).rejects.toBeInstanceOf(CheckInTimeLimitError)
  })
})
