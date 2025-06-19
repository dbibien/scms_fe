import { CalendarIcon } from "lucide-react"
import { FormDescription, FormField, FormItem, FormLabel } from "./ui/form"
import { Calendar } from "./ui/calendar"
import { useState } from "react"
import { addDays, format } from "date-fns"

type CProps = {
  form: any,
  name: string,
  label: string,
  description?: string,
  isButtonClickable?: boolean,
  houseCheckStartDate?: Date | undefined,
}

const SCMSFormInputCalendar2 = ({ form, name, label, description = "", isButtonClickable = true, houseCheckStartDate }: CProps) => {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleDayClick = (e: Date) => {
    // console.log(e)

    const newSelectedDate = new Date(e)

    // console.log("newSelectedDate: ", newSelectedDate)
    // console.log("selectedDate: ", selectedDate)

    if (newSelectedDate?.getTime() === selectedDate?.getTime()) {
      // control._defaultValues[name] = undefined
      setSelectedDate(undefined)
      setOpen(false)
      return
    }

    setSelectedDate(new Date(e))
    setOpen(false)
  }

  const watchedField = form.watch(name)

  // console.log("selectedDate: ", selectedDate)
  // console.log("form.control: ", form.control)
  // // console.log("control._defaultValues: ", control._defaultValues[name])
  // console.log("watchedHouseChecktDate: ", watchedField)
  // console.log("watchField: ", typeof (watchedField))

  return (
    <div>
      <p className={`text-sm font-medium ${form.control?._formState?.errors[name]?.message && "text-red-500"}`}>{label}</p>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={!isButtonClickable}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
        disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground 
        h-10 px-4 py-2 w-[240px] pl-3 text-left font-normal text-muted-foreground"
      >
        {selectedDate ? <span className="text-black">{format(selectedDate, "PPP")}</span> :
          watchedField && watchedField !== undefined ? <span className="text-black">{format(new Date(watchedField), "PPP")}</span> :
            <span>Pick a date</span>
        }

        <CalendarIcon className="lucide lucide-calendar ml-auto h-4 w-4 opacity-50" />
      </button>

      <p className="text-red-500 text-sm">{form.control?._formState?.errors[name]?.message}</p>

      {open && (
        <div>
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <Calendar
                  className="z-50 w-72 overflow-hidden mt-1 rounded-md border bg-popover text-popover-foreground shadow-md outline-none"
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  onDayClick={(e) => handleDayClick(e)}
                  // disabled={(date) =>
                  //   date > new Date() || date < new Date("1900-01-01")
                  // }
                  disabled={(date) =>
                    houseCheckStartDate !== undefined && date < addDays(houseCheckStartDate, 1)
                  }
                  initialFocus
                />
                <FormDescription>{description}</FormDescription>
              </FormItem>
            )}
          />
        </div>
      )}

    </div>
  )
}

export default SCMSFormInputCalendar2
