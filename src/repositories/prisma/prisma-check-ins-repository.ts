import { PAGINATION_DEFAULT_PAGE_SIZE } from '@/config/pagination'
import type { CheckIn } from '@/generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'
import { DateUtils } from '@/util/date-utils'

import type { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: CheckInUncheckedCreateInput): Promise<CheckIn> {
    return await prisma.checkIn.create({ data })
  }

  async findById(id: string): Promise<CheckIn | null> {
    return prisma.checkIn.findFirst({ where: { id } })
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    return await prisma.checkIn.update({
      data: { validated_at: checkIn.validated_at },
      where: { id: checkIn.id },
    })
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = DateUtils.startOfTheDay(date)
    const endOfTheDay = DateUtils.endOfTheDay(date)

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
    })
  }

  async findManyByUserId(data: {
    userId: string
    page?: number
    limit?: number
  }): Promise<CheckIn[]> {
    const currentPage = data.page ?? 1
    const itemsPerPage = data.limit ?? PAGINATION_DEFAULT_PAGE_SIZE

    return prisma.checkIn.findMany({
      where: {
        user_id: data.userId,
      },
      take: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
    })
  }

  async countByUserId(userId: string): Promise<number> {
    return prisma.checkIn.count({
      where: { user_id: userId },
    })
  }
}
