import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

import { makeAuthenticatedUser } from './factories/make-authenticated-user'

describe('Check-in metrics (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should be able to get the total count of check-ins', async () => {
    const { token, userData } = await makeAuthenticatedUser(app)
    const { id } = userData

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

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.json().gym.id, user_id: id },
        { gym_id: gym.json().gym.id, user_id: id },
      ],
    })

    const response = await app
      .inject()
      .get('/check-ins/metrics')
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(200)
    expect(response.json().checkInsCount).toEqual(2)
  })
})
