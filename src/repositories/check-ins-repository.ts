import type { CheckIn } from '@/generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '@/generated/prisma/models'

export interface CheckInsRepository {
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(data: { userId: string; page?: number; limit?: number }): Promise<CheckIn[]>
}
