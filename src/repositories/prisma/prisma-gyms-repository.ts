import type { GymCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'

import type { GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: GymCreateInput) {
    return await prisma.gym.create({ data })
  }

  async FindById(id: string) {
    return await prisma.gym.findUnique({ where: { id } })
  }
}
