import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export class FetchNearbyGymsUseCaseFactory {
  static create() {
    const gymsRepository = new PrismaGymsRepository()
    return new FetchNearbyGymsUseCase(gymsRepository)
  }
}
