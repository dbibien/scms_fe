import { Control } from "react-hook-form"
import { Calendar } from "./ui/calendar"
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { createReportFormSchema } from "@/common/formSchemas"
import { z } from "zod"

type CProps = {
  control: Control<z.infer<typeof createReportFormSchema>>,
}

const SCMSFormInputCalendar = ({ control }: CProps) => {
  return (
    <FormField
      control={control}
      name="incidentTimeDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel></FormLabel>
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            // disabled={(date) =>
            //   date > new Date() || date < new Date("1900-01-01")
            // }
            initialFocus
            className="bg-gray-50 flex justify-center"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SCMSFormInputCalendar

