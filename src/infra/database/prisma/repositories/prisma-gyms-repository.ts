import { Gym } from '@/domain/entities/gym'
import type { GymsRepository, FindManyNearbyParams } from '@/domain/repositories/gyms-repository'
import { prisma } from '@/lib/prisma'

import { PrismaGymMapper } from '../../mappers/prisma-gym-mapper'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({ where: { id } })

    if (!gym) {
      return null
    }

    return PrismaGymMapper.toDomain(gym)
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms.map(PrismaGymMapper.toDomain)
  }

  async findManyNearby(
    { latitude, longitude }: FindManyNearbyParams,
    page: number,
  ): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<any[]>`
      SELECT 
        *,
        (
          6371 * ACOS(
            COS(RADIANS(${latitude})) 
            * COS(RADIANS(latitude)) 
            * COS(RADIANS(longitude) - RADIANS(${longitude})) 
            + SIN(RADIANS(${latitude})) 
            * SIN(RADIANS(latitude))
          )
        ) AS distance
      FROM gyms
      WHERE (
        6371 * ACOS(
          COS(RADIANS(${latitude})) 
          * COS(RADIANS(latitude)) 
          * COS(RADIANS(longitude) - RADIANS(${longitude})) 
          + SIN(RADIANS(${latitude})) 
          * SIN(RADIANS(latitude))
        )
      ) <= 10
      ORDER BY distance ASC
      LIMIT 20
      OFFSET ${(page - 1) * 20}
    `

    return gyms.map(PrismaGymMapper.toDomain)
  }

  async create(gym: Gym): Promise<void> {
    const data = PrismaGymMapper.toPersistence(gym)

    await prisma.gym.create({
      data,
    })
  }
}
