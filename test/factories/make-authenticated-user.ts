import { randomUUID } from 'node:crypto'

import { hash } from 'bcrypt'
import type { FastifyInstance } from 'fastify'

import type { UserRoles } from '@/domain/entities/user'
import { prisma } from '@/lib/prisma'

export async function makeAuthenticatedUser({
  app,
  isAdmin = false,
  email,
  name = 'Arthur Morgan',
}: {
  app: FastifyInstance
  isAdmin?: boolean
  email?: string
  name?: string
}) {
  const userEmail = email ?? `user-${randomUUID()}@test.com`

  const userData = {
    name,
    email: userEmail,
    password: 'Abc123@',
    role: (isAdmin ? 'ADMIN' : 'MEMBER') as UserRoles,
  }

  const { password, ...userWithoutPassword } = userData

  const user = await prisma.user.create({
    data: {
      ...userWithoutPassword,
      password_hash: await hash(password, 6),
    },
  })

  const authResponse = await app.inject().post('/sessions').body({
    email: userData.email,
    password: userData.password,
  })

  const { token } = authResponse.json()
  return { token, userData: { ...userData, id: user.id } }
}
