import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

type CProps = {
  label: string,
  date: Date | undefined,
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
}

// <PopoverContent className="w-auto p-0 ">

const DatePicker = ({ label, date, setDate }: CProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <p>{label}: </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
            className="z-1000 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker
