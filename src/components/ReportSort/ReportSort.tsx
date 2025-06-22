
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

type CProps = {
  label: string,
  styles?: string,
  handleReportSortBy: (val: "newest" | "oldest") => void
}

const ReportSort = ({ label, styles = "", handleReportSortBy }: CProps) => {

  return (
    <div className={styles}>
      <Accordion type="single" collapsible>
        <AccordionItem value="report-types">
          <AccordionTrigger className="font-normal">{label}</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2">
            <RadioGroup onValueChange={(val: "newest" | "oldest") => handleReportSortBy(val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="newest" id="newest" />
                <Label htmlFor="newest">Newest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oldest" id="oldest" />
                <Label htmlFor="oldest">Oldest</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default ReportSort
