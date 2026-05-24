import { describe, expect, it } from 'vitest'

import { Gym } from './gym'

describe('Gym Entity', () => {
  it('should be able to create a new gym', () => {
    const gym = Gym.create({
      title: 'RDR2',
      description: 'The best gym for RDR2 lovers',
      phone: '123456789',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.id).toStrictEqual(expect.any(String))
    expect(gym.title).toBe('JavaScript Gym')
    expect(gym.latitude).toBe(-27.2092052)
  })
})
