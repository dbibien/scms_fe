import { Checkbox } from "./ui/checkbox"

type CProps = {
  id: string,
  name: string,
  hint?: string
}

const CheckBox = ({ id, name, hint }: CProps) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id={id} />

      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {name}
        </label>

        {hint && (
          <p className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    </div>
  )
}

export default CheckBox
