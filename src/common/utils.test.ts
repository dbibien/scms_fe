import { describe, expect, it } from "vitest"
import { getFirstDateOfWeek, isNowBetweenStartAndEndDates } from "./utils";

describe("getFirstDateOfWeek ", () => {
  it("should return May 11th, 2025 as the first date of the week when the weeks starts on Sundays and the given date is May 14th, 2025", () => {
    const date = new Date("May 14 2025")

    const answer = getFirstDateOfWeek(date, "sunday")
    expect(answer).toEqual(new Date("May 11 2025"))
  })

  it("should return April 20th, 2025 as the first date of the week when the weeks starts on Sundays and the given date is April 21st, 2025", () => {
    const date = new Date("April 21 2025")

    const answer = getFirstDateOfWeek(date, "sunday")
    expect(answer).toEqual(new Date("April 20 2025"))
  })

  it("should return April 20th, 2025 as the first date of the week when the weeks starts on Sundays and the given date is April 20th, 2025", () => {
    const date = new Date("April 20 2025")

    const answer = getFirstDateOfWeek(date, "sunday")
    expect(answer).toEqual(new Date("April 20 2025"))
  })

  it("should return April 20th, 2025 as the first date of the week when the weeks starts on Sundays and the given date is April 26th, 2025", () => {
    const date = new Date("April 26 2025")

    const answer = getFirstDateOfWeek(date, "sunday")
    expect(answer).toEqual(new Date("April 20 2025"))
  })
})

describe("isNowBetweenStartAndEndDates ", () => {
  // NOTE: the hours, minute, and seconds of the end date for a house check should be 11:59:59pm. This will make sure the house remain in the list of houses to be checked all the way until the end of the day

  it("should return 'true' when the current date is BETWEEN the start and end date", () => {
    const now = new Date()
    const start = new Date("April 17, 2025 03:24:00")
    const end = new Date("April 17, 3040 03:24:00")

    const answer = isNowBetweenStartAndEndDates(now, start, end)
    expect(answer).toBeTruthy()
  })

  it("should return 'true' when the current date is the SAME as the start date", () => {
    const now = new Date("April 17, 2025 03:24:00")
    const start = new Date("April 17, 2025 03:24:00")
    const end = new Date("April 17, 3040 03:24:00")

    const answer = isNowBetweenStartAndEndDates(now, start, end)
    expect(answer).toBeTruthy()
  })

  it("should return 'true' when the current date is the SAME as the end date", () => {
    const now = new Date("April 17, 2025 15:24:00")
    const start = new Date("April 17, 2020 03:24:00")
    const end = new Date("April 17, 2025 15:24:00")

    const answer = isNowBetweenStartAndEndDates(now, start, end)
    expect(answer).toBeTruthy()
  })

  it("should return 'false' when the current date is BEFORE the start date", () => {
    const now = new Date("January 17, 1990 03:24:00")
    const start = new Date("April 17, 2025 03:24:00")
    const end = new Date("April 17, 3040 03:24:00")

    const answer = isNowBetweenStartAndEndDates(now, start, end)
    expect(answer).toBeFalsy()
  })

  it("should return 'false' when the current date is AFTER the end date", () => {
    const now = new Date("January 17, 2030 03:24:00")
    const start = new Date("April 17, 2022 03:24:00")
    const end = new Date("April 17, 2025 03:24:00")

    const answer = isNowBetweenStartAndEndDates(now, start, end)
    expect(answer).toBeFalsy()
  })
})
