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
