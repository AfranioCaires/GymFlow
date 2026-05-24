import { CheckIn } from '@/domain/entities/check-in'
import type { CheckIn as PrismaCheckIn, Prisma } from '@/generated/prisma/client'

export class PrismaCheckInMapper {
  static toDomain(raw: PrismaCheckIn): CheckIn {
    return CheckIn.create(
      {
        userId: raw.user_id,
        gymId: raw.gym_id,
        validatedAt: raw.validated_at,
        createdAt: raw.created_at,
      },
      raw.id,
    )
  }

  static toPersistence(checkIn: CheckIn): Prisma.CheckInUncheckedCreateInput {
    return {
      id: checkIn.id,
      user_id: checkIn.userId,
      gym_id: checkIn.gymId,
      validated_at: checkIn.validatedAt,
      created_at: checkIn.createdAt,
    }
  }
}
