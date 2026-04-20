export class CheckInTimeLimitError extends Error {
  constructor() {
    super('Check-in validation expired. Maximum time limit is 20 minutes.')
    this.name = 'CheckInTimeLimitError'
  }
}
