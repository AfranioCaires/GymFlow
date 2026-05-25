import { describe, expect, it } from 'vitest'

import { User } from './user'

describe('User Entity', () => {
  it('should be able to create a new user', () => {
    const user = User.create({
      name: 'Arthur Morgan',
      email: 'arthur@morgan.com',
      passwordHash: '123456',
      role: 'MEMBER',
    })

    expect(user.id).toStrictEqual(expect.any(String))
    expect(user.name).toBe('Arthur Morgan')
    expect(user.role).toBe('MEMBER')
    expect(user.createdAt).toBeInstanceOf(Date)
    expect(user.updatedAt).toBeInstanceOf(Date)
  })

  it('should be able to create a new admin user', () => {
    const user = User.create({
      name: 'Admin Morgan',
      email: 'admin@arthurmorgan.com',
      passwordHash: '123456',
      role: 'ADMIN',
    })

    expect(user.role).toBe('ADMIN')
  })
})
