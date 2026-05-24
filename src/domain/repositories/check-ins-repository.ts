import { CheckIn } from '../entities/check-in'

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  create(checkIn: CheckIn): Promise<void>
  save(checkIn: CheckIn): Promise<void>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
}
