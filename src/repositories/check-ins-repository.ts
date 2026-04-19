import type { CheckIn } from '@/generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '@/generated/prisma/models'

export interface CheckInsRepository {
  save(checkIn: CheckIn): Promise<CheckIn>
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(data: { userId: string; page?: number; limit?: number }): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
}
