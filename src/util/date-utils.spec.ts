import { describe, expect, it } from 'vitest'

import { DateUtils } from './date-utils'

describe('DateUtils', () => {
  it('should be able to get the start of the day', () => {
    const date = new Date(2024, 0, 1, 15, 30, 45)
    const start = DateUtils.startOfTheDay(date)

    expect(start.getHours()).toBe(0)
    expect(start.getMinutes()).toBe(0)
    expect(start.getSeconds()).toBe(0)
    expect(start.getMilliseconds()).toBe(0)
  })

  it('should be able to get the end of the day', () => {
    const date = new Date(2024, 0, 1, 15, 30, 45)
    const end = DateUtils.endOfTheDay(date)

    expect(end.getHours()).toBe(23)
    expect(end.getMinutes()).toBe(59)
    expect(end.getSeconds()).toBe(59)
    expect(end.getMilliseconds()).toBe(999)
  })

  it('should be able to check if two dates are on the same day', () => {
    const dateA = new Date(2024, 0, 1, 10, 0, 0)
    const dateB = new Date(2024, 0, 1, 20, 0, 0)
    const dateC = new Date(2024, 0, 2, 10, 0, 0)

    expect(DateUtils.isOnTheSameDay(dateA, dateB)).toBe(true)
    expect(DateUtils.isOnTheSameDay(dateA, dateC)).toBe(false)
  })

  it('should be able to check if a date is between two others (exclusive)', () => {
    const startDate = new Date(2024, 0, 1)
    const endDate = new Date(2024, 0, 3)
    const dateBetween = new Date(2024, 0, 2)
    const dateOnStart = new Date(2024, 0, 1)

    expect(DateUtils.isBetween({ date: dateBetween, startDate, endDate })).toBe(true)
    expect(DateUtils.isBetween({ date: dateOnStart, startDate, endDate })).toBe(false)
  })

  it('should be able to check if a date is between two others (inclusive)', () => {
    const startDate = new Date(2024, 0, 1)
    const endDate = new Date(2024, 0, 3)
    const dateOnStart = new Date(2024, 0, 1)
    const dateOnEnd = new Date(2024, 0, 3)

    expect(DateUtils.isBetween({ date: dateOnStart, startDate, endDate, inclusive: true })).toBe(true)
    expect(DateUtils.isBetween({ date: dateOnEnd, startDate, endDate, inclusive: true })).toBe(true)
  })

  it('should be able to calculate the difference between two dates in ms', () => {
    const dateA = new Date(2024, 0, 1, 10, 0, 1)
    const dateB = new Date(2024, 0, 1, 10, 0, 0)

    expect(DateUtils.diff(dateA, dateB)).toBe(1000)
  })
})
