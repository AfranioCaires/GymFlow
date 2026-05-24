import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

import { makeAuthenticatedUser } from './factories/make-authenticated-user'

describe('Create a check-in (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should be able to create a check-in', async () => {
    const { token: adminToken } = await makeAuthenticatedUser({
      app,
      isAdmin: true,
    })

    const { token: userToken } = await makeAuthenticatedUser({ app })

    const gymResponse = await app
      .inject()
      .post('/gyms')
      .body({
        title: "Arthur Morgan's Gym",
        description: 'Dutch said we need more money',
        phone: null,
        latitude: -23.5505,
        longitude: -46.6333,
      })
      .headers({ authorization: `Bearer ${adminToken}` })

    const { gym } = gymResponse.json()

    const checkInResponse = await app
      .inject()
      .post(`/gyms/${gym.id}/check-ins`)
      .body({ userLatitude: -23.5505, userLongitude: -46.6333 })
      .headers({ authorization: `Bearer ${userToken}` })

    const { checkIn } = checkInResponse.json()

    const response = await app
      .inject()
      .patch(`/check-ins/${checkIn.id}/validate`)
      .headers({ authorization: `Bearer ${adminToken}` })

    const validatedCheckIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    })
    expect(response.statusCode).toBe(204)

    expect(validatedCheckIn?.validated_at).toEqual(expect.any(Date))
  })
})
