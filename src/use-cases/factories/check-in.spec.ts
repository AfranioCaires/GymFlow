import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'

import { CheckInUseCase } from '../check-in'

let checkInRepository: CheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check in Use Case', () => {
  const gymData = {
    title: 'Gym',
    description: '',
    phone: '',
    latitude: 0,
    longitude: 0,
  }

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2026, 0, 1, 8, 0, 0))

    const { id } = await gymsRepository.create(gymData)

    const checkInData = {
      userId: crypto.randomUUID(),
      gymId: id,
      userLatitude: 0,
      userLongitude: 0,
    }

    const { checkIn } = await sut.execute(checkInData)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2026, 0, 1, 8, 0, 0))

    const { id } = await gymsRepository.create(gymData)

    const checkInData = {
      userId: crypto.randomUUID(),
      gymId: id,
      userLatitude: 0,
      userLongitude: 0,
    }

    await sut.execute(checkInData)

    await expect(() => sut.execute(checkInData)).rejects.toBeInstanceOf(Error)
  })

  it('should be abre to check in diffent days', async () => {
    vi.setSystemTime(new Date(2026, 0, 1, 8, 0, 0))

    const { id } = await gymsRepository.create(gymData)

    const checkInData = {
      userId: crypto.randomUUID(),
      gymId: id,
      userLatitude: 0,
      userLongitude: 0,
    }

    await sut.execute(checkInData)

    vi.setSystemTime(new Date(2026, 0, 2, 8, 0, 0))

    const { checkIn } = await sut.execute(checkInData)

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
