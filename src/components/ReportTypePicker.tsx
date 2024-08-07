import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type CProps = {
  label: string,
  styles?: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
}

const REPORT_TYPES = [
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
    value: "ems_respond",
    label: "EMS respond",
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
    value: "vehicle_tailgaiting",
    label: "Vehicle tailgating",
  },
  {
    id: 11,
    value: "youths_fishing",
    label: "Youths fishing",
  },
]

const ReportTypePicker = ({ label, styles = "", setValue }: CProps) => {
  return (
    <div className={styles}>
      <p>{label}:</p>
      <Select onValueChange={(e) => setValue(e)}>
        <SelectTrigger className="w-full">
          <SelectValue defaultValue="" placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          {REPORT_TYPES.map(type => (
            <SelectItem key={type.id} value={type.value}>{type.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ReportTypePicker
