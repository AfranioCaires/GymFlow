import { describe, expect, it } from 'vitest'

import { CheckIn } from './check-in'

describe('CheckIn Entity', () => {
  it('should be able to create a new check-in', () => {
    const checkIn = CheckIn.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toStrictEqual(expect.any(String))
    expect(checkIn.gymId).toBe('gym-01')
    expect(checkIn.userId).toBe('user-01')
    expect(checkIn.createdAt).toBeInstanceOf(Date)
    expect(checkIn.validatedAt).toBeUndefined()
  })

  it('should be able to validate a check-in', () => {
    const checkIn = CheckIn.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    checkIn.validate()

    expect(checkIn.validatedAt).toBeInstanceOf(Date)
  })
})
