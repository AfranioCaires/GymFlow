import { Entity } from '@/core/domain/entity'

export type GymAttributes = {
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

export class Gym extends Entity<GymAttributes> {
  get title() {
    return this.attributes.title
  }

  get description() {
    return this.attributes.description
  }

  get phone() {
    return this.attributes.phone
  }

  get latitude() {
    return this.attributes.latitude
  }

  get longitude() {
    return this.attributes.longitude
  }

  static create(attributes: GymAttributes, id?: string) {
    const gym = new Gym(attributes, id)
    return gym
  }
}
