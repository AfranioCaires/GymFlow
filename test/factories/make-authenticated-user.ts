import { hash } from 'bcrypt'
import type { FastifyInstance } from 'fastify'

import { prisma } from '@/lib/prisma'

export async function makeAuthenticatedUser(
  app: FastifyInstance,
  // isAdmin = false,
) {
  const userData = {
    name: 'Arthur Morgan',
    email: 'arthurmorgan@test.com',
    password: 'Abc123@',
    // role: isAdmin ? 'ADMIN' : 'MEMBER',
  }

  const { password, ...userWithoutPassword } = userData

  await prisma.user.create({
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
  return { token, userData }
}
