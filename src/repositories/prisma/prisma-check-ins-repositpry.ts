import type { CheckIn } from '@/generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '@/generated/prisma/models'
import { prisma } from '@/lib/prisma'

import type { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: CheckInUncheckedCreateInput): Promise<CheckIn> {
    return await prisma.checkIn.create({ data })
  }
}
