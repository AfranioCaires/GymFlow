export class CheckInTwiceOnTheSameDayError extends Error {
  constructor() {
    super('User already checked in today.')
    this.name = 'CheckInTwiceInTheSameDayError'
  }
}
