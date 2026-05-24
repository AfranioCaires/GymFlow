import { Gym } from '../entities/gym'

export type FindManyNearbyParams = {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyParams, page: number): Promise<Gym[]>
  create(gym: Gym): Promise<void>
}
