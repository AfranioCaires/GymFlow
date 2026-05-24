import { Entity } from '@/core/domain/entity'

export type UserAttributes = {
  name: string
  email: string
  passwordHash: string
  createdAt?: Date
  updatedAt?: Date
}

export class User extends Entity<UserAttributes> {
  get name() {
    return this.attributes.name
  }

  get email() {
    return this.attributes.email
  }

  get passwordHash() {
    return this.attributes.passwordHash
  }

  get createdAt() {
    return this.attributes.createdAt
  }

  get updatedAt() {
    return this.attributes.updatedAt
  }

  static create(attributes: UserAttributes, id?: string) {
    const user = new User(
      {
        ...attributes,
        createdAt: attributes.createdAt ?? new Date(),
        updatedAt: attributes.updatedAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
