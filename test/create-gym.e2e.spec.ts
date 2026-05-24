import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

import { makeAuthenticatedUser } from './factories/make-authenticated-user'

describe('Create gym (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should be able to create a gym', async () => {
    const { token } = await makeAuthenticatedUser({ app, isAdmin: true })

    const response = await app
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

    expect(response.statusCode).toBe(201)
  })
})
