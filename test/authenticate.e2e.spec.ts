import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should be able to authenticate', async () => {
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

    const response = await app
      .inject()
      .post('/sessions')
      .body({ email: user.email, password: user.password })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ token: expect.any(String) })
  })
})
