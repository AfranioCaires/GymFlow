import { PAGINATION_DEFAULT_PAGE_SIZE } from '@/config/pagination'
import type { Gym } from '@/generated/prisma/client'
import type { GymCreateInput } from '@/generated/prisma/models'

import type { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  readonly gyms: Gym[] = []

  async create(data: GymCreateInput): Promise<Gym> {
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

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)
    return gym || null
  }

  async findManyByTitle(data: { query: string; page?: number; limit?: number }): Promise<Gym[]> {
    const currentPage = data.page ?? 1
    const itemsPerPage = data.limit ?? PAGINATION_DEFAULT_PAGE_SIZE

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const gyms = this.gyms
      .filter(({ title }) => title.trim().toLowerCase().includes(data.query.trim().toLowerCase()))
      .slice(startIndex, endIndex)

    return gyms
  }
}
