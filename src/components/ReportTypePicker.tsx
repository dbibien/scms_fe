import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { REPORT_TYPES } from "@/common/utils"

type CProps = {
  label: string,
  styles?: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
}

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
