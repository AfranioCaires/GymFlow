import { User } from '@/domain/entities/user'
import type { User as PrismaUser, Prisma } from '@/generated/prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        passwordHash: raw.password_hash,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    )
  }

  static toPersistence(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.passwordHash,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    }
  }
}
