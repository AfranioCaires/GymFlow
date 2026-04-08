import type { User } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

type RegisterUserUseCaseRequest = {
  name: string
  email: string
  password: string
}

export async function registerUserUseCase({
  name,
  email,
  password,
}: RegisterUserUseCaseRequest): Promise<User> {
  const password_hash = await Bun.password.hash(password)

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  return user
}
