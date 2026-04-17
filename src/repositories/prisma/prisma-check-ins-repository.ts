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
}
