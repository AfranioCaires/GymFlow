import { PAGINATION_DEFAULT_PAGE_SIZE, type Pagination } from '@/config/pagination'
import type { Gym } from '@/generated/prisma/client'
import type { GymCreateInput } from '@/generated/prisma/models'
import type { FetchNeabyGymsDto } from '@/use-cases/fetch-nearby-gyms'
import { getDistanceBetweenCoordinates } from '@/util/calculate-distance'

import type { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  readonly gyms: Gym[] = []

  async create(data: GymCreateInput) {
    const gym = {
      id: data.id ?? crypto.randomUUID(),
      title: data.title,
      description: data.description || null,
      phone: data.phone || null,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.gyms.push(gym)

    return Promise.resolve(gym)
  }

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id)
    return gym || null
  }

  async findManyByTitle(data: { query: string; page?: number; limit?: number }) {
    const currentPage = data.page ?? 1
    const itemsPerPage = data.limit ?? PAGINATION_DEFAULT_PAGE_SIZE

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const gyms = this.gyms
      .filter(({ title }) => title.trim().toLowerCase().includes(data.query.trim().toLowerCase()))
      .slice(startIndex, endIndex)

    return gyms
  }

  async findManyNearby(data: FetchNeabyGymsDto & Pagination) {
    const { userLatitude, userLongitude, page, limit } = data

    const currentPage = page ?? 1
    const itemsPerPage = limit ?? PAGINATION_DEFAULT_PAGE_SIZE

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const nearbyGyms = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: gym.latitude, longitude: gym.longitude },
      )

      const DESIRED_DISTANCE_IN_KILOMETERS = 10

      return distance < DESIRED_DISTANCE_IN_KILOMETERS
    })

    return nearbyGyms.slice(startIndex, endIndex)
  }
}
