export class CheckInTimeLimitError extends Error {
  constructor() {
    super('The check-in can only be validated until 20 minutes after its creation.')
    this.name = 'CheckInTimeLimitError'
  }
}
