import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { createReportFormSchema } from "@/common/formSchemas";
import { z } from "zod";

type CProps = {
  control: Control<z.infer<typeof createReportFormSchema>>,
  name: "type" | "weather",
  label: string,
  placeHolder: string,
  data: {
    id: number;
    value: string;
    label: string;
  }[]
}

const SCMSFormInputSelector = ({ control, name, label, placeHolder, data }: CProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}:</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="focus-visible:ring-0 focus:ring-0" >
                <SelectValue placeholder={placeHolder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data?.map(type => (
                <SelectItem key={type.id} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}

export default SCMSFormInputSelector
// <Select onValueChange={field.onChange} defaultValue={field.value}>
