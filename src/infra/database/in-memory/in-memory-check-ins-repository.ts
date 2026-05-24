import { CheckIn } from '@/domain/entities/check-in'
import type { CheckInsRepository } from '@/domain/repositories/check-ins-repository'
import { DateUtils } from '@/util/date-utils'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = DateUtils.startOfTheDay(date)
    const endOfTheDay = DateUtils.endOfTheDay(date)

    const checkInOnSameDate = this.items.find((checkIn) => {
      const isSameDate =
        checkIn.createdAt &&
        DateUtils.isBetween({
          date: checkIn.createdAt,
          startDate: startOfTheDay,
          endDate: endOfTheDay,
          inclusive: true,
        })

      return checkIn.userId === userId && isSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items.filter((item) => item.userId === userId).slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.userId === userId).length
  }

  async create(checkIn: CheckIn) {
    this.items.push(checkIn)
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }
  }
}
