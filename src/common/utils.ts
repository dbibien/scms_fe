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

export const shouldHouseBeAddedToHouseCheckList = (houseCheckStartDate: Date, houseCheckEndDate: Date, houseCheckLastCheckedDate: Date, currentDate: Date, startOfWeekDate: Date): boolean => {
  // console.log("houseId: ", houseId)
  // console.log("start: ", houseCheckStartDate)
  // console.log("end: ", houseCheckEndDate)
  // console.log("week start: ", startOfWeekDate)
  // console.log("last: ", houseCheckLastCheckedDate)
  // console.log("current: ", currentDate)
  // console.log()

  // if (!houseCheckLastCheckedDate) console.log("no last check")

  const currentDateInTime = currentDate.getTime()

  const areDatesTheSame = currentDate.getFullYear() === houseCheckEndDate.getFullYear() && currentDate.getMonth() === houseCheckEndDate.getMonth() && currentDate.getDate() === houseCheckEndDate.getDate()
  // console.log("areDatesTheSame: ", areDatesTheSame)

  if ((houseCheckStartDate.getTime() <= currentDateInTime && (areDatesTheSame || currentDateInTime <= houseCheckEndDate.getTime())) && houseCheckLastCheckedDate.getTime() < startOfWeekDate.getTime()) return true

  return false
}

