import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { SearchGymsUseCase } from '../search-gyms-use-case'

export class SearchGymsUseCaseFactory {
  static create() {
    const gymsRepository = new PrismaGymsRepository()
    return new SearchGymsUseCase(gymsRepository)
  }
}
