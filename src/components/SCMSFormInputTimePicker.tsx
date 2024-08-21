import { Control } from "react-hook-form";
import SInput from "./SInput"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { createReportFormSchema } from "@/common/formSchemas";
import { z } from "zod";

type CProps = {
  control: Control<z.infer<typeof createReportFormSchema>>,
}

const SCMSFormInputTimePicker = ({ control }: CProps) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <FormField
        control={control}
        name="incidentTimeHour"
        render={({ field }) => (
          <FormItem>
            <FormLabel></FormLabel>
            <FormControl>
              <SInput
                type="number"
                min={0}
                max={23}
                name="incidentTimeHour"
                placeHolder="H"
                styles="lg:w-18"
                fields={field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      :
      <FormField
        control={control}
        name="incidentTimeMinute"
        render={({ field }) => (
          <FormItem>
            <FormLabel></FormLabel>
            <FormControl>
              <SInput
                type="number"
                min={0}
                max={59}
                name="incidentTimeMinute"
                placeHolder="M"
                styles="lg:w-18"
                fields={field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default SCMSFormInputTimePicker 
