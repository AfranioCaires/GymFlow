import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should be able to refresh a token', async () => {
    const user = {
      name: 'Arthur Morgan',
      email: 'arthurmorgan@test.com',
      password: 'Abc123@',
    }

    await app.inject().post('/users').body({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const authResponse = await app
      .inject()
      .post('/sessions')
      .body({ email: user.email, password: user.password })

    const cookies = authResponse.cookies.find((c) => c.name === 'refreshToken')

    const response = await app
      .inject()
      .patch('/token/refresh')
      .cookies({ refreshToken: cookies?.value })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ token: expect.any(String) })
    expect(response.cookies).toEqual([expect.objectContaining({ name: 'refreshToken' })])
  })
})
