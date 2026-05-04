import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

import { makeAuthenticatedUser } from './factories/make-authenticated-user'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should be able to get a user profile', async () => {
    const { token, userData } = await makeAuthenticatedUser(app)

    const response = await app
      .inject()
      .get('/users/profile')
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(200)
    expect(response.json().user).toEqual(
      expect.objectContaining({ id: expect.any(String), email: userData.email }),
    )
  })
})
