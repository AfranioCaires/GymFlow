import type { CheckIn } from '@/generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '@/generated/prisma/models'

import type { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  readonly checkIns: CheckIn[] = []

  async create(data: CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: crypto.randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return Promise.resolve(checkIn)
  }
}
