import { Gym } from '@/domain/entities/gym'
import type { GymsRepository, FindManyNearbyParams } from '@/domain/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/util/calculate-distance'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, page: number) {
    return this.items.filter((item) => item.title.includes(query)).slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyParams, page: number) {
    return this.items
      .filter((item) => {
        const distance = getDistanceBetweenCoordinates(
          { latitude: params.latitude, longitude: params.longitude },
          { latitude: item.latitude, longitude: item.longitude },
        )

        return distance < 10
      })
      .slice((page - 1) * 20, page * 20)
  }

  async create(gym: Gym) {
    this.items.push(gym)
  }
}
