import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { REPORT_TYPES } from "@/common/utils"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { ReportFilterType } from "@/common/types"

type CProps = {
  label: string,
  styles?: string,
  reportFilterTypes: ReportFilterType[]
  setReportFilterTypes: React.Dispatch<React.SetStateAction<ReportFilterType[]>>
  setValue: React.Dispatch<React.SetStateAction<string>>,
}

const ReportTypePicker2 = ({ label, styles = "", setValue }: CProps) => {
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

// export ReportTypePicker2

const ReportTypePicker = ({ label, styles = "", setReportValue, reportFilterTypes, setReportFilterTypes }: CProps) => {

  const isChecked = (checked: string | boolean, selectedType: ReportFilterType) => {
    const newReportFilterType = reportFilterTypes.map(val => {
      if (selectedType.id === val.id) {
        if (checked) {
          console.log("in here", "val.label", val.label)
          return {
            id: val.id,
            value: val.value,
            label: val.label,
            isSelected: true,
          }
        } else {
          return {
            id: val.id,
            value: val.value,
            label: val.label,
            isSelected: false,
          }
        }
      } else {
        return {
          id: val.id,
          value: val.value,
          label: val.label,
          isSelected: val.isSelected,
        }
      }
    })

    console.log("checked: ", checked, "selectedType: ", selectedType)
    console.log("newReportFilterType: ", newReportFilterType)

    return newReportFilterType
  }

  return (
    <div className={styles}>
      <p>{label}:</p>
      <Accordion type="single" collapsible>
        <AccordionItem value="report-types">
          <AccordionTrigger>Report types</AccordionTrigger>
          <AccordionContent>
            {reportFilterTypes.map(type => (
              <div
                key={type.id}
                className="flex flex-row items-center gap-2 mb-4"
              >
                <Checkbox
                  key={type.id}
                  // checked={type.id}
                  checked={type.isSelected}
                  onCheckedChange={(checked) => setReportFilterTypes(isChecked(checked, type))}
                >
                  {type.label}
                </Checkbox>
                <Label htmlFor={`${type.id}`}>{type.label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default ReportTypePicker
