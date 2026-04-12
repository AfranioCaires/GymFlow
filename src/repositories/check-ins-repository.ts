import type { CheckIn } from '@/generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '@/generated/prisma/models'

export interface CheckInsRepository {
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
}
