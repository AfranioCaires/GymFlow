import type { User } from '@/generated/prisma/client'
import type { UserCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'

import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateInput): Promise<User> {
    return await prisma.user.create({ data })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } })
  }
}
