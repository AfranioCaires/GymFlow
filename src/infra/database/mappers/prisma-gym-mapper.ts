import { Gym } from '@/domain/entities/gym'
import type { Gym as PrismaGym, Prisma } from '@/generated/prisma/client'

export class PrismaGymMapper {
  static toDomain(raw: PrismaGym): Gym {
    return Gym.create(
      {
        title: raw.title,
        description: raw.description,
        phone: raw.phone,
        latitude: raw.latitude,
        longitude: raw.longitude,
      },
      raw.id,
    )
  }

  static toPersistence(gym: Gym): Prisma.GymUncheckedCreateInput {
    return {
      id: gym.id,
      title: gym.title,
      description: gym.description,
      phone: gym.phone,
      latitude: gym.latitude,
      longitude: gym.longitude,
    }
  }
}
