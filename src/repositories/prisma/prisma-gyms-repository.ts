import { PAGINATION_DEFAULT_PAGE_SIZE } from '@/config/pagination'
import type { Gym } from '@/generated/prisma/client'
import type { GymCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'

import type { GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: GymCreateInput) {
    return await prisma.gym.create({ data })
  }

  async findById(id: string) {
    return await prisma.gym.findUnique({ where: { id } })
  }

  async findManyByTitle(data: { query: string; page?: number; limit?: number }): Promise<Gym[]> {
    const currentPage = data.page ?? 1
    const pageItems = data.limit ?? PAGINATION_DEFAULT_PAGE_SIZE

    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: data.query,
          mode: 'insensitive',
        },
      },
      take: pageItems,
      skip: (currentPage - 1) * pageItems,
    })

    return gyms
  }
}
