export class DistanceNotAllowedError extends Error {
  constructor() {
    super('Distance not allowed.')
    this.name = 'DistanceNotAllowedError'
  }
}
