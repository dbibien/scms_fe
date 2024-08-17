import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Control } from "react-hook-form";
import { Switch } from "./ui/switch"

type CProps = {
  control: Control<{
    type: string;
    weather: string;
    incidentTime: string;
    injury: boolean;
    ems_pbso: boolean;
    phoneNumber: string;
    narative: string;
    house?: string | undefined;
    resident?: string | undefined;
    createdBy?: string | undefined;
  }>,
  name: "injury" | "ems_pbso",
  label: string,
}

const SCMSFormInputSwitch = ({ control, name, label }: CProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2 mt-4">
            <FormLabel>{label}:</FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SCMSFormInputSwitch
