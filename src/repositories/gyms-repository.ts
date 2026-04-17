import type { Gym } from '@/generated/prisma/client'
import type { GymCreateInput } from '@/generated/prisma/models'

export interface GymsRepository {
  create: (data: GymCreateInput) => Promise<Gym>
  findById: (id: string) => Promise<Gym | null>
  findManyByTitle: (data: { query: string; page?: number; limit?: number }) => Promise<Gym[]>
}
