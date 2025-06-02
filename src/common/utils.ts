import { houseType } from "./types"

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
  const endOfMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, -1)

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
  // console.log("houseId: ", houseId)
  // console.log("start: ", houseCheckStartDate)
  // console.log("end: ", houseCheckEndDate)
  // console.log("week start: ", startOfWeekDate)
  // console.log("last: ", houseCheckLastCheckedDate)
  // console.log("current: ", currentDate)
  // console.log()

  if (!houseCheckLastCheckedDate) {
    return isDateBetweenStartAndEndDates(now, houseCheckStartDate, houseCheckEndDate)
  }

  if (daysBetweenDates(now, houseCheckLastCheckedDate) < 7) return false // return false if the house was checked less than 7 days ago

  const lastCheckDatePlus7Days = addDaysToDate(houseCheckLastCheckedDate, 7)
  return isDateBetweenStartAndEndDates(lastCheckDatePlus7Days, houseCheckStartDate, houseCheckEndDate)
}

export const isDateBetweenStartAndEndDates = (date: Date, houseCheckStart: Date, houseCheckEnd: Date) => {
  if (date.getTime() >= houseCheckStart.getTime() && date.getTime() <= houseCheckEnd.getTime()) return true
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

    const shouldReturnHouse = shouldHouseBeAddedToHouseCheckList(start, end, lastChecked, currentDate, startOfWeekDate)
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

export const displayDateStringIn24HourFormat = (date: string) => {
  return new Date(date).toLocaleString("en-US", { hour12: false })
}

export const addDaysToDate = (date: Date, daysToAdd: number) => {
  date.setDate(date.getDate() + daysToAdd)
  return date
}

export const daysBetweenDates = (end: Date, start: Date) => {
  const diffInMs = end.getTime() - start.getTime()
  const diffInDays = Math.floor(diffInMs / (24 * 60 * 60 * 1000))
  return diffInDays
}
