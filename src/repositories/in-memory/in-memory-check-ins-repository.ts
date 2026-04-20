import { PAGINATION_DEFAULT_PAGE_SIZE } from '@/config/pagination'
import type { CheckIn } from '@/generated/prisma/browser'
import type { CheckInUncheckedCreateInput } from '@/generated/prisma/models'
import { DateUtils } from '@/util/date-utils'

import type { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  readonly checkIns: CheckIn[] = []

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = {
      id: data.id ?? crypto.randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return Promise.resolve(checkIn)
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = DateUtils.startOfTheDay(date)
    const endOfTheDay = DateUtils.endOfTheDay(date)

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      return (
        checkIn.user_id === userId &&
        DateUtils.isBetween({
          date: checkIn.created_at,
          startDate: startOfTheDay,
          endDate: endOfTheDay,
          inclusive: true,
        })
      )
    })

    return checkInOnSameDate || null
  }

  async findManyByUserId(data: { userId: string; page?: number; limit?: number }) {
    const currentPage = data.page ?? 1
    const itemsPerPage = data.limit ?? PAGINATION_DEFAULT_PAGE_SIZE

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return this.checkIns
      .filter((checkIn) => checkIn.user_id === data.userId)
      .slice(startIndex, endIndex)
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findById(id: string) {
    const check = this.checkIns.find((check) => check.id === id)
    return check || null
  }
}
