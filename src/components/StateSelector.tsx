import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type CProps = {
  control: Control<{
    address: string;
    city: string;
    state: string,
    zip: string;
    type?: string | undefined;
    apt?: string | undefined;
    note?: string | undefined;
    member_number?: string | undefined;
    security_code?: string | undefined;
    report?: string | undefined;
  }> | undefined,
  name: string,
}

const StateSelector = ({ control }: CProps) => {
  return (
    <FormField
      control={control}
      name="state"
      render={({ field }) => (
        <FormItem>
          <FormLabel>State:</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="focus-visible:ring-0 focus:ring-0" >
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="AL">Alabama (AL)</SelectItem>
              <SelectItem value="Ak">Alaska (AK)</SelectItem>
              <SelectItem value="AZ">Arizona (AZ)</SelectItem>
              <SelectItem value="AR">Arkansas (AR)</SelectItem>
              <SelectItem value="AS">American Samoa (AS)</SelectItem>
              <SelectItem value="CA">California (CA)</SelectItem>
              <SelectItem value="CO">Colorado (CO)</SelectItem>
              <SelectItem value="CT">Connecticut (CT)</SelectItem>
              <SelectItem value="DE">Delaware (DE)</SelectItem>
              <SelectItem value="DC">District of Columbia (DC)</SelectItem>
              <SelectItem defaultChecked={true} value="FL">Florida (FL)</SelectItem>
              <SelectItem value="GA">Georgia (GA)</SelectItem>
              <SelectItem value="GU">Guam (GU)</SelectItem>
              <SelectItem value="HI">Hawaii (HI)</SelectItem>
              <SelectItem value="ID">Idaho (ID)</SelectItem>
              <SelectItem value="IL">Illinois (IL)</SelectItem>
              <SelectItem value="IN">Indiana (IN)</SelectItem>
              <SelectItem value="IA">Iowa (IA)</SelectItem>
              <SelectItem value="KS">Kansas (KS)</SelectItem>
              <SelectItem value="KY">Kentucky (KY)</SelectItem>
              <SelectItem value="LA">Louisiana (LA)</SelectItem>
              <SelectItem value="ME">Maine (ME)</SelectItem>
              <SelectItem value="MD">Maryland (MD)</SelectItem>
              <SelectItem value="MA">Massachusetts (MA)</SelectItem>
              <SelectItem value="MI">Michigan (MI)</SelectItem>
              <SelectItem value="MN">Minnesota (MN)</SelectItem>
              <SelectItem value="MS">Mississippi (MS)</SelectItem>
              <SelectItem value="MO">Missouri (MO)</SelectItem>
              <SelectItem value="MT">Montana (MT)</SelectItem>
              <SelectItem value="NE">Nebraska (NE)</SelectItem>
              <SelectItem value="NV">Nevada (NV)</SelectItem>
              <SelectItem value="NH">New Hampshire (NH)</SelectItem>
              <SelectItem value="NJ">New Jersey (NJ)</SelectItem>
              <SelectItem value="NM">New Mexico (NM)</SelectItem>
              <SelectItem value="NY">New York (NY)</SelectItem>
              <SelectItem value="NC">North Carolina (NC)</SelectItem>
              <SelectItem value="ND">North Dakota (ND)</SelectItem>
              <SelectItem value="MP">Northern Mariana Islands (MP)</SelectItem>
              <SelectItem value="OH">Ohio (OH)</SelectItem>
              <SelectItem value="OK">Oklahoma (OK)</SelectItem>
              <SelectItem value="OR">Oregon (OR)</SelectItem>
              <SelectItem value="PA">Pennsylvania (PA)</SelectItem>
              <SelectItem value="PR">Puerto Rico (PR)</SelectItem>
              <SelectItem value="RI">Rhode Island (RI)</SelectItem>
              <SelectItem value="SC">South Carolina (SC)</SelectItem>
              <SelectItem value="SD">South Dakota (SD)</SelectItem>
              <SelectItem value="TN">Tennessee (TN)</SelectItem>
              <SelectItem value="TX">Texas (TX)</SelectItem>
              <SelectItem value="TT">Trust Territories (TT)</SelectItem>
              <SelectItem value="UT">Utah (UT)</SelectItem>
              <SelectItem value="VT">Vermont (VT)</SelectItem>
              <SelectItem value="VA">Virginia (VA)</SelectItem>
              <SelectItem value="VI">Virgin Islands (VI)</SelectItem>
              <SelectItem value="WA">Washington (WA)</SelectItem>
              <SelectItem value="WV">West Virginia (WV)</SelectItem>
              <SelectItem value="WI">Wisconsin (WI)</SelectItem>
              <SelectItem value="WY">Wyoming (WY)</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}

export default StateSelector
// <Select onValueChange={field.onChange} defaultValue={field.value}>
