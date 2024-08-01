import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type CProps = {
  label: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
}

const ReportTypePicker = ({ label, setValue }: CProps) => {

  return (
    <>
      <p>{label}</p>
      <Select onValueChange={(e) => setValue(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Something</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}

export default ReportTypePicker
