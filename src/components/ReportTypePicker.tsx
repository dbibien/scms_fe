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

const ReportTypePicker = ({ label, styles = "", setValue }: CProps) => {
  return (
    <div className={styles}>
      <p>{label}:</p>
      <Select onValueChange={(e) => setValue(e)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Something</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ReportTypePicker
