import { describe, expect, it } from "vitest"
import { addDaysToDate, getFirstDateOfWeek, isDateBetweenStartAndEndDates, shouldHouseBeAddedToHouseCheckList } from "./utils";

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

describe("isDateBetweenStartAndEndDates ", () => {
  // NOTE: the hours, minute, and seconds of the end date for a house check should be 11:59:59pm. This will make sure the house remain in the list of houses to be checked all the way until the end of the day

  it("should return 'true' when the current date is BETWEEN the start and end date", () => {
    const date = new Date("April 19, 2025 ")
    const start = new Date("April 17, 2025 00:00:00")
    const end = new Date("April 20, 2025 23:59:59")

    const answer = isDateBetweenStartAndEndDates(date, start, end)
    expect(answer).toBeTruthy()
  })

  it("should return 'true' when the current date is the SAME as the start date", () => {
    const now = new Date("April 17, 2025 03:24:00")
    const start = new Date("April 17, 2025 03:24:00")
    const end = new Date("April 17, 3040 03:24:00")

    const answer = isDateBetweenStartAndEndDates(now, start, end)
    expect(answer).toBeTruthy()
  })

  it("should return 'true' when the current date is the SAME as the end date", () => {
    const now = new Date("April 17, 2025 15:24:00")
    const start = new Date("April 17, 2020 03:24:00")
    const end = new Date("April 17, 2025 15:24:00")

    const answer = isDateBetweenStartAndEndDates(now, start, end)
    expect(answer).toBeTruthy()
  })

  it("should return 'false' when the current date is BEFORE the start date", () => {
    const now = new Date("April 11, 2025 00:00:00")
    const start = new Date("April 17, 2025 00:00:00")
    const end = new Date("April 17, 3040 23:59:59")

    const answer = isDateBetweenStartAndEndDates(now, start, end)
    expect(answer).toBeFalsy()
  })

  it("should return 'false' when the current date is AFTER the end date", () => {
    const now = new Date("January 17, 2030 03:24:00")
    const start = new Date("April 17, 2022 03:24:00")
    const end = new Date("April 17, 2025 03:24:00")

    const answer = isDateBetweenStartAndEndDates(now, start, end)
    expect(answer).toBeFalsy()
  })
})

describe("addDaysToDate", () => {
  it("should return May 19 2025, 00:00:00 when 7 days is added to May 12, 2025 00:00:00", () => {
    const date = new Date("May 12, 2025 00:00:00")
    const datePlus7Days = addDaysToDate(date, 7)

    const expectedDate = new Date("May 19 2025, 00:00:00")

    expect(datePlus7Days).toStrictEqual(expectedDate)
  })

  it("should return May 08 2025, 00:00:00 when 7 days is added to May 01, 2025 00:00:00", () => {
    const date = new Date("May 01, 2025 00:00:00")
    const datePlus7Days = addDaysToDate(date, 7)

    const expectedDate = new Date("May 08 2025, 00:00:00")

    expect(datePlus7Days).toStrictEqual(expectedDate)
  })

  it("should return June 03 2025, 00:00:00 when 7 days is added to May 27, 2025 00:00:00", () => {
    const date = new Date("May 27, 2025 00:00:00")
    const datePlus7Days = addDaysToDate(date, 7)

    const expectedDate = new Date("June 03 2025, 00:00:00")

    expect(datePlus7Days).toStrictEqual(expectedDate)
  })

  it("should return June 07 2025, 00:00:00 when 7 days is added to May 31, 2025 00:00:00", () => {
    const date = new Date("May 31, 2025 00:00:00")
    const datePlus7Days = addDaysToDate(date, 7)

    const expectedDate = new Date("June 07 2025, 00:00:00")

    expect(datePlus7Days).toStrictEqual(expectedDate)
  })
})

describe("shouldHouseBeAddedToHouseCheckList", () => {
  it('should return "True" when NO Last House Checks, Current date is BETWEEN the start and end date of the house check dates', () => {
    const lastHouseCheckDate = null
    const houseCheckStartDate = new Date()
    const houseCheckEndDate = new Date()
    houseCheckEndDate.setDate(houseCheckStartDate.getDate() + 3)

    const ans = shouldHouseBeAddedToHouseCheckList(houseCheckStartDate, houseCheckEndDate, lastHouseCheckDate)

    expect(ans).toBeTruthy()
  })

  it('should return "False" when NO Last House Checks, Current date is BEFORE the start and end date of the house check dates ', () => {
    const lastHouseCheckDate = null
    const houseCheckStartDate = new Date()
    houseCheckStartDate.setDate(houseCheckStartDate.getDate() + 3)
    const houseCheckEndDate = new Date()
    houseCheckEndDate.setDate(houseCheckStartDate.getDate() + 5)

    const ans = shouldHouseBeAddedToHouseCheckList(houseCheckStartDate, houseCheckEndDate, lastHouseCheckDate)

    expect(ans).toBeFalsy()
  })

  it('should return "False" when NO Last House Checks, Current date is AFTER the start and end date of the house check dates ', () => {
    const lastHouseCheckDate = null
    const houseCheckStartDate = new Date()
    houseCheckStartDate.setDate(houseCheckStartDate.getDate() - 5)
    const houseCheckEndDate = new Date()
    houseCheckEndDate.setDate(houseCheckStartDate.getDate() - 3)

    const ans = shouldHouseBeAddedToHouseCheckList(houseCheckStartDate, houseCheckEndDate, lastHouseCheckDate)

    expect(ans).toBeFalsy()
  })

  it('should return "True" when Last House Checks is BETWEEN the house checks start date. Last House Checks: April 10, 2025 16:05:00, house check start: April 01, 2025 00:00:00, house check end: April 20, 2025 23:59:59', () => {
    const lastHouseCheckDate = new Date("April 10, 2025 16:05:00")
    const houseCheckStartDate = new Date("April 01, 2025 00:00:00")
    const houseCheckEndDate = new Date("April 20, 2025 23:59:59")

    const ans = shouldHouseBeAddedToHouseCheckList(houseCheckStartDate, houseCheckEndDate, lastHouseCheckDate)

    expect(ans).toBeTruthy()
  })

  it('should return "False" when Last House Checks is BEFORE the house checks start date. Last House Checks: April 01, 2025 16:05:00, house check start: April 10, 2025 00:00:00, house check end: April 12, 2025 23:59:59', () => {
    const lastHouseCheckDate = new Date("April 01, 2025 16:05:00")
    const houseCheckStartDate = new Date("April 10, 2025 00:00:00")
    const houseCheckEndDate = new Date("April 12, 2025 23:59:59")

    const ans = shouldHouseBeAddedToHouseCheckList(houseCheckStartDate, houseCheckEndDate, lastHouseCheckDate)

    expect(ans).toBeFalsy()
  })

  it('should return "False" when Last House Checks is AFTER the house check end date. Last House Checks: April 10, 2025 16:05:00, house check start: April 01, 2025 00:00:00, house check end: April 12, 2025 23:59:59', () => {
    const lastHouseCheckDate = new Date("April 10, 2025 16:05:00")
    const houseCheckStartDate = new Date("April 01, 2025 00:00:00")
    const houseCheckEndDate = new Date("April 12, 2025 23:59:59")

    const ans = shouldHouseBeAddedToHouseCheckList(houseCheckStartDate, houseCheckEndDate, lastHouseCheckDate)

    expect(ans).toBeFalsy()
  })
})
