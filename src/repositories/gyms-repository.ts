import type { Gym } from '@/generated/prisma/client'
import type { GymCreateInput } from '@/generated/prisma/models'

export interface GymsRepository {
  create: (data: GymCreateInput) => Promise<Gym>
  FindById: (id: string) => Promise<Gym | null>
}
