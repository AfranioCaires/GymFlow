import { PAGINATION_DEFAULT_PAGE_SIZE, type Pagination } from '@/config/pagination'
import type { Gym } from '@/generated/prisma/client'
import type { GymCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'
import type { FetchNeabyGymsDto } from '@/use-cases/fetch-nearby-gyms'
import { getDistanceBetweenCoordinates } from '@/util/calculate-distance'

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

  async findManyNearby(data: FetchNeabyGymsDto & Pagination): Promise<Gym[]> {
    const { userLatitude, userLongitude, page, limit } = data

    const currentPage = page ?? 1
    const itemsPerPage = limit ?? PAGINATION_DEFAULT_PAGE_SIZE

    const DESIRED_DISTANCE_IN_KILOMETERS = 10
    const KILOMETERS_PER_DEGREE = 111

    const radiusInDegrees = DESIRED_DISTANCE_IN_KILOMETERS / KILOMETERS_PER_DEGREE

    const gyms = await prisma.gym.findMany({
      where: {
        AND: [
          {
            latitude: { gte: userLatitude - radiusInDegrees, lte: userLatitude + radiusInDegrees },
          },
          {
            longitude: {
              gte: userLongitude - radiusInDegrees,
              lte: userLongitude + radiusInDegrees,
            },
          },
        ],
      },
      take: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
    })

    return gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: gym.latitude, longitude: gym.longitude },
      )

      return distance < DESIRED_DISTANCE_IN_KILOMETERS
    })
  }
}
