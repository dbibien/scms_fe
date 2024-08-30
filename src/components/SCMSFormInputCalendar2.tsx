import { CalendarIcon } from "lucide-react"
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Calendar } from "./ui/calendar"
import { useState } from "react"

type CProps = {
  control: any,
}

const SCMSFormInputCalendar2 = ({ control }: CProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
        disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground 
        h-10 px-4 py-2 w-[240px] pl-3 text-left font-normal text-muted-foreground"
      >
        <span>Pick a date</span>
        <CalendarIcon className="lucide lucide-calendar ml-auto h-4 w-4 opacity-50" />
      </button>


      <div className="z-50 w-72 overflow-hidden mt-1 rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
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
              // className="bg-gray-50 flex justify-center"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default SCMSFormInputCalendar2
