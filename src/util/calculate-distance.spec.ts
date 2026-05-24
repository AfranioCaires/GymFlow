import { describe, expect, it } from 'vitest'

import { getDistanceBetweenCoordinates } from './calculate-distance'

describe('calculate distance between coordinates', () => {
  it('should return 0 when coordinates are the same', () => {
    const from = { latitude: -27.2092052, longitude: -49.6401091 }
    const to = { latitude: -27.2092052, longitude: -49.6401091 }

    const distance = getDistanceBetweenCoordinates(from, to)

    expect(distance).toBe(0)
  })

  it('should be able to calculate the distance between two coordinates', () => {
    const from = { latitude: -27.2092052, longitude: -49.6401091 }
    const to = { latitude: -27.0615922, longitude: -49.5229501 }

    const distance = getDistanceBetweenCoordinates(from, to)

    // ~20.6 km
    expect(distance).toBeLessThan(21)
    expect(distance).toBeGreaterThan(20)
  })

  it('should return a distance greater than zero for different coordinates', () => {
    const from = { latitude: -23.55052, longitude: -46.633309 }
    const to = { latitude: -22.906847, longitude: -43.172896 }

    const distance = getDistanceBetweenCoordinates(from, to)

    // ~357 km
    expect(distance).toBeGreaterThan(350)
    expect(distance).toBeLessThan(400)
  })
})
