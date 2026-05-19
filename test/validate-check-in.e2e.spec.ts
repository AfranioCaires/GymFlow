import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

import { makeAuthenticatedUser } from './factories/make-authenticated-user'

describe('Create a check-in (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should be able to create a check-in', async () => {
    const { token } = await makeAuthenticatedUser(app)

    const gym = await app
      .inject()
      .post('/gyms')
      .body({
        title: "Arthur Morgan's Gym",
        description: 'Dutch said we need more money',
        phone: null,
        latitude: -23.5505,
        longitude: -46.6333,
      })
      .headers({ authorization: `Bearer ${token}` })

    const checkIn = await app
      .inject()
      .post(`/gyms/${gym.json().gym.id}/check-ins`)
      .body({ userLatitude: -23.5505, userLongitude: -46.6333 })
      .headers({ authorization: `Bearer ${token}` })

    const response = await app
      .inject()
      .patch(`/check-ins/${checkIn.json().checkIn.id}/validate`)
      .headers({ authorization: `Bearer ${token}` })

    const validatedCheckIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.json().checkIn.id },
    })
    expect(response.statusCode).toBe(204)

    expect(validatedCheckIn?.validated_at).toEqual(expect.any(Date))
  })
})
