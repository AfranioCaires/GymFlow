import type { Pagination } from '@/config/pagination'
import type { Gym } from '@/generated/prisma/client'
import type { GymCreateInput } from '@/generated/prisma/models'
import type { FetchNeabyGymsDto } from '@/use-cases/fetch-nearby-gyms'

export interface GymsRepository {
  create: (data: GymCreateInput) => Promise<Gym>
  findById: (id: string) => Promise<Gym | null>
  findManyByTitle: (data: { query: string & Pagination }) => Promise<Gym[]>
  findManyNearby: (data: FetchNeabyGymsDto & Pagination) => Promise<Gym[]>
}
