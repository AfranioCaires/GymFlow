import { PAGINATION_DEFAULT_PAGE_SIZE, type Pagination } from '@/config/pagination'
import type { Gym } from '@/generated/prisma/client'
import type { GymCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'
import type { FetchNeabyGymsDto } from '@/use-cases/fetch-nearby-gyms'

import type { GymsRepository } from '../gyms-repository'
export class PrismaGymsRepository implements GymsRepository {
  async create(data: GymCreateInput) {
    return await prisma.gym.create({ data })
  }

  async findById(id: string) {
    return await prisma.gym.findUnique({ where: { id } })
  }

  async findManyByTitle(data: { query: string; page?: number; limit?: number }) {
    const currentPage = data.page ?? 1
    const pageItems = data.limit ?? PAGINATION_DEFAULT_PAGE_SIZE

    const gyms = await prisma.gym.findMany({
      where: { title: { contains: data.query, mode: 'insensitive' } },
      take: pageItems,
      skip: (currentPage - 1) * pageItems,
    })

    return gyms
  }

  async findManyNearby(data: FetchNeabyGymsDto & Pagination) {
    const { userLatitude, userLongitude, page, limit } = data
    const currentPage = page ?? 1
    const itemsPerPage = limit ?? PAGINATION_DEFAULT_PAGE_SIZE
    const DESIRED_DISTANCE_IN_KILOMETERS = 10

    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT 
        *,
        (
          6371 * ACOS(
            COS(RADIANS(${userLatitude})) 
            * COS(RADIANS(latitude)) 
            * COS(RADIANS(longitude) - RADIANS(${userLongitude})) 
            + SIN(RADIANS(${userLatitude})) 
            * SIN(RADIANS(latitude))
          )
        ) AS distance
      FROM gyms
      WHERE (
        6371 * ACOS(
          COS(RADIANS(${userLatitude})) 
          * COS(RADIANS(latitude)) 
          * COS(RADIANS(longitude) - RADIANS(${userLongitude})) 
          + SIN(RADIANS(${userLatitude})) 
          * SIN(RADIANS(latitude))
        )
      ) <= ${DESIRED_DISTANCE_IN_KILOMETERS}
      ORDER BY distance ASC
      LIMIT ${itemsPerPage}
      OFFSET ${(currentPage - 1) * itemsPerPage}
    `

    return gyms
  }
}
