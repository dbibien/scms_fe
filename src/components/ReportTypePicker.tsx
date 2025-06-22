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

const ReportTypePicker = ({ label, styles = "", setReportValue, reportFilterTypes, setReportFilterTypes }: CProps) => {

  const isChecked = (checked: string | boolean, selectedType: ReportFilterType) => {
    const newReportFilterType = reportFilterTypes.map(val => {
      if (selectedType.id === val.id) {
        if (checked) {
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

    return newReportFilterType
  }

  return (
    <div className={styles}>
      <Accordion type="single" collapsible>
        <AccordionItem value="report-types">
          <AccordionTrigger className="font-normal">{label}</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2">
            {reportFilterTypes.map(type => (
              <div
                key={type.id}
                className="flex flex-row items-center gap-2 mt-2 mb-4"
              >
                <Checkbox
                  aria-label={type.label}
                  key={`${type.id}`}
                  id={`${type.id}`}
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
