import { CheckIn } from '@/domain/entities/check-in'
import type { CheckInsRepository } from '@/domain/repositories/check-ins-repository'
import { prisma } from '@/lib/prisma'
import { DateUtils } from '@/util/date-utils'

import { PrismaCheckInMapper } from '../../mappers/prisma-check-in-mapper'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    if (!checkIn) {
      return null
    }

    return PrismaCheckInMapper.toDomain(checkIn)
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = DateUtils.startOfTheDay(date)
    const endOfTheDay = DateUtils.endOfTheDay(date)

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
    })

    if (!checkIn) {
      return null
    }

    return PrismaCheckInMapper.toDomain(checkIn)
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns.map(PrismaCheckInMapper.toDomain)
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async create(checkIn: CheckIn): Promise<void> {
    const data = PrismaCheckInMapper.toPersistence(checkIn)

    await prisma.checkIn.create({
      data,
    })
  }

  async save(checkIn: CheckIn): Promise<void> {
    const data = PrismaCheckInMapper.toPersistence(checkIn)

    await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
