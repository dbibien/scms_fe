import { addDays, subDays } from "date-fns"
import { ReportFilterType, houseType } from "./types"

type backend400ErrorMessageType = {
  code: number,
  message: string,
  data: {
    [key: string]: {
      code: string,
      message: string,
    }
  },
}

export const REPORT_TYPES = [
  {
    id: 1,
    value: "accident",
    label: "Accident",
  },
  {
    id: 2,
    value: "assist_ems",
    label: "Assist EMS",
  },
  {
    id: 3,
    value: "damaged_mailbox",
    label: "Damaged mailbox",
  },
  {
    id: 4,
    value: "ems_response",
    label: "EMS response",
  },
  {
    id: 5,
    value: "false_alarm",
    label: "False alarm",
  },
  {
    id: 12,
    value: "garage_door_light_check",
    label: "Garage door light check",
  },
  {
    id: 14,
    value: "house_check",
    label: "House check",
  },
  {
    id: 6,
    value: "loud_noise",
    label: "Loud noise",
  },
  {
    id: 7,
    value: "open_garage_door",
    label: "Open garage door",
  },
  {
    id: 13,
    value: "ticket_issued",
    label: "Ticket issued",
  },
  {
    id: 8,
    value: "unauthorized_entry",
    label: "Unauthorized entry",
  },
  {
    id: 9,
    value: "vehicle_damage",
    label: "Vehicle damage",
  },
  {
    id: 10,
    value: "vehicle_tailgaite",
    label: "Vehicle tailgate",
  },
  {
    id: 11,
    value: "youths_fishing",
    label: "Youths fishing",
  },
]

export const reportFilterStartAndEndOfMonthDates = () => {
  const today = new Date()
  const startOfMonthDate = new Date(today.getFullYear(), today.getMonth())
  const endOfMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, -1, 23, 59, 59, 59)

  return {
    today: today,
    startOfMonthDate: startOfMonthDate,
    endOfMonthDate: endOfMonthDate,
  }
}

export const retrieve400ErrorMessage = (errData: backend400ErrorMessageType) => {
  if (!errData?.code) return "An error occured"

  let errMessage = ""
  for (const key in errData?.data) {
    errMessage += key + ": " + errData?.data[key].message + ". "
  }

  return errMessage
}

export const getFirstDateOfWeek = (date: Date, startDay: 'sunday' | 'monday' = 'monday'): Date => {
  const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  let diff: number;

  if (startDay === 'sunday') {
    diff = dayOfWeek; // Sunday is 0, so no adjustment needed for it.
  } else {
    diff = (dayOfWeek + 6) % 7; // For Monday start, shift the days so Monday is 0.
  }

  const firstDateOfWeek = new Date(date);
  firstDateOfWeek.setDate(date.getDate() - diff);
  return firstDateOfWeek;
}

export const shouldHouseBeAddedToHouseCheckList = (now: Date, houseCheckStartDate: Date, houseCheckEndDate: Date, houseCheckLastCheckedDate: Date | null): boolean => {
  // must first check whether the current date (now) is in between the start and end date for the house check
  if (isDateBetweenStartAndEndDates(now, houseCheckStartDate, houseCheckEndDate) === false) return false // if the now is NOT in between the start and end date, do not include the house in the list of homes to be checked

  // @ts-expect-error I know
  if (!isValidDate(houseCheckLastCheckedDate)) {
    return isDateBetweenStartAndEndDates(now, houseCheckStartDate, houseCheckEndDate)
  }

  // the house does not need to be checked if the last time it was checked was less than 7 days ago
  // @ts-expect-error just ts type error
  if (diffBetweenDays(now, houseCheckLastCheckedDate) < 7 && isDateBetweenStartAndEndDates(houseCheckLastCheckedDate, houseCheckStartDate, houseCheckEndDate)) return false

  // @ts-expect-error just ts type error
  if (diffBetweenDays(now, houseCheckLastCheckedDate) >= 7 &&
    // @ts-expect-error just ts type error
    isDateBetweenStartAndEndDates(houseCheckLastCheckedDate, houseCheckStartDate, houseCheckEndDate)) return true // return true if the last time the house was check is more than 7 days ago and is within the start and end date set for the house to be checked

  // if the last house check is BEFORE the start date but the current date is between the start and end date of the house check, the house should be checked
  // @ts-expect-error just ts type error
  if (houseCheckLastCheckedDate?.getTime() < houseCheckStartDate.getTime() && isDateBetweenStartAndEndDates(now, houseCheckStartDate, houseCheckEndDate)) return true

  // @ts-expect-error just ts type error
  const lastCheckDatePlus7Days = addDaysToDate(houseCheckLastCheckedDate, 7)
  return isDateBetweenStartAndEndDates(lastCheckDatePlus7Days, houseCheckStartDate, houseCheckEndDate)
}

export const isDateBetweenStartAndEndDates = (date: Date, houseCheckStart: Date, houseCheckEnd: Date) => {
  //if any one of the date isn't a date, return false
  if (!isValidDate(date) || !isValidDate(houseCheckStart) || !isValidDate(houseCheckEnd)) return false

  if (date?.getTime() >= houseCheckStart?.getTime() && date?.getTime() <= houseCheckEnd?.getTime()) return true
  return false
}

export const filterForHousesToBeChecked = (houses: houseType[], searchValue: string) => {
  const filterdList = houses.filter(house => {
    console.log("house: ", house)

    const currentDate = new Date()
    const start = new Date(house?.house_check_start_date)
    const end = new Date(house?.house_check_end_date)
    const startOfWeekDate = getFirstDateOfWeek(currentDate, 'sunday')
    let lastChecked = house?.house_check_last_date === "" ? new Date(startOfWeekDate) : new Date(house?.house_check_last_date)
    lastChecked = new Date(lastChecked.setDate(lastChecked.getDate() - 1))
    // console.log("lastChecked: ", lastChecked)

    console.log("currentDate: ", currentDate)
    console.log("start: ", start)
    console.log("end: ", end)
    console.log("date of start of week: ", startOfWeekDate)
    console.log("lastChecked: ", lastChecked)

    const now = new Date()
    const shouldReturnHouse = shouldHouseBeAddedToHouseCheckList(now, start, end, lastChecked)
    // console.log("shouldReturnHouse: ", shouldReturnHouse)

    if (house?.house_check && shouldReturnHouse && searchValue === "") {
      // console.log("house: ", house)
      return house
    } else if (house?.house_check && shouldReturnHouse && (
      house.address?.toLowerCase().includes(searchValue.toLowerCase()) ||
      house.apt?.toLowerCase().includes(searchValue.toLowerCase()) ||
      house.city?.toLowerCase().includes(searchValue.toLowerCase()) ||
      house.state?.toLowerCase().includes(searchValue.toLowerCase()) ||
      house.zip?.toLowerCase().includes(searchValue.toLowerCase()))
    ) {
      return house
    }
  })

  return filterdList
}

export const displayDateStringIn24HourFormat = (date: string): string => {
  const dateString = new Date(date).toLocaleString("en-US", { hour12: false })

  if (dateString === "Invalid Date") return "N/A"

  return dateString
}

export const isValidDate = (date: Date): boolean => {
  if (date === null) return false
  return new Date(date).toString() !== "Invalid Date"
}

export const addDaysToDate = (date: Date, daysToAdd: number) => {
  date.setDate(date.getDate() + daysToAdd)
  return date
}

export const diffBetweenDays = (end: Date, start: Date): number => {
  const diffInMs = end?.getTime() - start?.getTime()
  const diffInDays = Math.floor(diffInMs / (24 * 60 * 60 * 1000))
  return diffInDays
}

export const disableHouseCheckCalendarDays = (calendarDate: Date, userSelectedDate: Date | undefined, currentDate: Date, position: "start" | "end") => {
  // decide which days on the calendar should not be selectable
  if (position === "start") { // days before the current date will not be selectable
    return calendarDate < subDays(currentDate, 1)
  }

  if (position === "end") { // the selected day and all days before it will not be selectable
    return userSelectedDate !== undefined && calendarDate < addDays(userSelectedDate, 1)
  }
}

export const generateSelectedReportTypeString = (reportFilterTypes: ReportFilterType[]): string => {
  // genrate the following string format:  "(tpe ?= "accident" || type ?= "house_check" || type ?= "assist_ems")"
  let generatedString = ""
  for (let i = 0; i < reportFilterTypes.length; i++) {
    if (reportFilterTypes[i].isSelected && generatedString === "") {
      generatedString += `type ?= "${reportFilterTypes[i].value}"`
    } else if (reportFilterTypes[i].isSelected && generatedString !== "") {
      generatedString += ` || type ?= "${reportFilterTypes[i].value}"`
    }
  }

  return generatedString
}
