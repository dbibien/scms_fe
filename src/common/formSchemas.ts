import { z } from "zod"

export const createReportFormSchema = z.object({
  type: z.string().min(1, "Invalid choice").max(20, "Invalid choice"),
  weather: z.string().min(1, "Invalid choice").max(20, "Invalid choice"),
  incidentTimeDate: z.date({ required_error: "An incident date is required" }), //.datetime({ message: "Invalid date and time" }),
  incidentTimeHour: z.number().min(0, "Hour must be between 0 and 23").max(23, "Hour must be between 0 and 23"),
  incidentTimeMinute: z.number().min(0, "Minute must be between 0 and 59").max(59, "Hour must be between 0 and 59"),
  injury: z.boolean(),
  ems_pbso: z.boolean(),
  phoneNumber: z.string().min(1, "Invalid phone number").max(17, "Invalid phone number"),
  narative: z.string().min(1, "Missing content").max(500, "Exeeced 500 characters count"),
  house: z.string().max(17, "Invalid house").optional(),
  resident: z.string().max(17, "Invalid resident").optional(),
  createdBy: z.string().max(17, "Invalid user").optional(),
})
