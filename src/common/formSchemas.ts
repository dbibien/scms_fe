import { z } from "zod"

export const homeUpdateFormSchema = z.object({
  address: z.string().min(1, "Address must be longer than a character").max(100, "Address must not exceed 100 characters "),
  apt: z.string().max(100, { message: "Apt. must not exceed 100 characters" }).optional(),
  city: z.string().min(1, { message: "City must be at least 1 character long" }).max(100, { message: "City must not exceed 100 characters" }),
  state: z.string().min(2, { message: "State must be selected" }),
  zip: z.string().min(1, { message: "Zip must be at least 1 character longk" }).max(100, { message: "Zip must not exceed 100 characters" }),
  note: z.string().max(256, { message: "Note must not exceed 256 characters" }).optional(),
  member_number: z.string().max(14, { message: "Member number must not exceed 14 characters" }).optional(),
  security_code: z.string().max(8, { message: "Security code must not exceed 8 characters" }).optional(),

  first_name: z.string().max(30, { message: "First name must not exceed 30 characters" }).optional(),
  last_name: z.string().max(30, { message: "Last name must not exceed 30 characters" }).optional(),
  owner: z.boolean().optional(),

  type: z.string().optional(),
  primary: z.boolean().optional(),

  house_check: z.boolean(),
  house_check_start_date: z.date(),
  house_check_end_date: z.date(),

  // report: z.string().max(256, { message: "Note must not exceed 256 characters" }).optional(),
  // password: z.string().min(8, { message: "Password must be between 8 and 24 characters" }).max(24, { message: "Password must be between 8 and 24 characters" }),
}).refine((data) => {
  if (data.house_check && !data.house_check_start_date) return false

  if (data?.house_check && !data?.house_check_end_date) return false
})

export const createReportFormSchema = z.object({
  type: z.string().min(1, "Invalid choice").max(50, "Invalid choice"),
  weather: z.string().min(1, "Invalid choice").max(20, "Invalid choice"),
  incidentTimeDate: z.date({ required_error: "An incident date is required" }), //.datetime({ message: "Invalid date and time" }),
  incidentTimeHour: z.string().min(0, "Hour must be between 0 and 23").max(23, "Hour must be between 0 and 23"),
  incidentTimeMinute: z.string().min(0, "Minute must be between 0 and 59").max(59, "Hour must be between 0 and 59"),
  injury: z.boolean().optional(),
  ems_pbso: z.boolean().optional(),
  // phoneNumber: z.string().min(1, "Invalid phone number").max(17, "Invalid phone number"),
  narative: z.string().min(1, "Missing content").max(500, "Exeeced 500 characters count"),
  house: z.string().max(17, "Invalid house").optional(),
  resident: z.string().max(17, "Invalid resident").optional(),
  createdBy: z.string().max(17, "Invalid user").optional(),
})
