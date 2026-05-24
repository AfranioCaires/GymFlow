import { Entity } from '@/core/domain/entity'

export type CheckInAttributes = {
  userId: string
  gymId: string
  validatedAt?: Date | null
  createdAt?: Date
}

export class CheckIn extends Entity<CheckInAttributes> {
  get userId() {
    return this.attributes.userId
  }

  get gymId() {
    return this.attributes.gymId
  }

  get validatedAt() {
    return this.attributes.validatedAt
  }

  get createdAt() {
    return this.attributes.createdAt
  }

  validate() {
    this.attributes.validatedAt = new Date()
  }

  static create(attributes: CheckInAttributes, id?: string) {
    const checkIn = new CheckIn(
      {
        ...attributes,
        createdAt: attributes.createdAt ?? new Date(),
      },
      id,
    )

    return checkIn
  }
}
