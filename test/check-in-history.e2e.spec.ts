import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

import { makeAuthenticatedUser } from './factories/make-authenticated-user'

describe('Check-in history (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should be able to list a check-in history', async () => {
    const { token: adminToken } = await makeAuthenticatedUser({
      app,
      isAdmin: true,
    })

    const { token: userToken, userData } = await makeAuthenticatedUser({ app })
    const { id: userId } = userData

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

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: userId },
        { gym_id: gym.id, user_id: userId },
      ],
    })

    const response = await app
      .inject()
      .get('/check-ins/history')
      .headers({ authorization: `Bearer ${userToken}` })

    expect(response.statusCode).toBe(200)
    expect(response.json().checkIns).toEqual([
      expect.objectContaining({
        user_id: userId,
        gym_id: gym.id,
      }),
      expect.objectContaining({
        user_id: userId,
        gym_id: gym.id,
      }),
    ])
  })
})
