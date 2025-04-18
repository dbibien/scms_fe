import { Control } from "react-hook-form";
import SInput from "./SInput"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { createReportFormSchema } from "@/common/formSchemas";
import { z } from "zod";
import { Button } from "./ui/button";
import { Clock } from "lucide-react";

type CProps = {
  control: Control<z.infer<typeof createReportFormSchema>>,
  handleSetCurrentTimeAsReportTime: () => void,
}

const SCMSFormInputTimePicker = ({ control, handleSetCurrentTimeAsReportTime }: CProps) => {
  return (
    <>
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

        <Button
          type="button"
          onClick={() => handleSetCurrentTimeAsReportTime()}
        >
          <Clock className="mr-2" />
          Now
        </Button>
      </div>
      <p className="text-sm text-orange-300">Note: Incident time MUST be in 24 hour format</p>
    </>
  )
}

export default SCMSFormInputTimePicker 
