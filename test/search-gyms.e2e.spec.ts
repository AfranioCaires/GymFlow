import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

import { makeAuthenticatedUser } from './factories/make-authenticated-user'

describe('Create gym (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should be able to search for gyms', async () => {
    const { token } = await makeAuthenticatedUser({ app, isAdmin: true })

    await app
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

    await app
      .inject()
      .post('/gyms')
      .body({
        title: "Dutch's Gym",
        description: 'We need more money',
        phone: null,
        latitude: -23.5505,
        longitude: -46.4833,
      })
      .headers({ authorization: `Bearer ${token}` })

    const response = await app
      .inject()
      .get('/gyms/search')
      .query({
        query: 'Arthur',
      })
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(200)
    expect(response.json().gyms).toHaveLength(1)
    expect(response.json().gyms).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: "Arthur Morgan's Gym" })]),
    )
  })
})
