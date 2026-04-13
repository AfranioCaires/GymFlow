import type { Gym } from '@/generated/prisma/client'
import type { GymCreateInput } from '@/generated/prisma/models'

import type { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  readonly gyms: Gym[] = []

  async create(data: GymCreateInput): Promise<Gym> {
    const gym = {
      id: crypto.randomUUID(),
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

  async FindById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)
    return gym || null
  }
}
