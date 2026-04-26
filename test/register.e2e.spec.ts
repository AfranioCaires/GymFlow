import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should be able to register', async () => {
    const response = await app.inject().post('/users').body({
      name: 'Arthur Morgan',
      email: 'arthurmorgan@test.com',
      password: 'Abc123@',
    })

    expect(response.statusCode).toBe(201)
  })
})
