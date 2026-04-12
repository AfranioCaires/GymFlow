export const DateUtils = {
  startOfTheDay(date: Date) {
    const copy = new Date(date)
    copy.setHours(0, 0, 0, 0)
    return copy
  },

  endOfTheDay(date: Date) {
    const copy = new Date(date)
    copy.setHours(23, 59, 59, 999)
    return copy
  },

  isOnTheSameDay(dateA: Date, dateB: Date) {
    return this.startOfTheDay(dateA).getTime() === this.startOfTheDay(dateB).getTime()
  },

  isBetween(data: { date: Date; startDate: Date; endDate: Date; inclusive?: boolean }) {
    const { date, startDate, endDate, inclusive } = data

    if (inclusive) {
      return date >= startDate && date <= endDate
    }

    return date > startDate && date < endDate
  },
}
