import { randomUUID } from 'node:crypto'

export abstract class Entity<Attributes> {
  private _id: string
  protected attributes: Attributes

  get id() {
    return this._id
  }

  constructor(attributes: Attributes, id?: string) {
    this.attributes = attributes
    this._id = id ?? randomUUID()
  }
}
