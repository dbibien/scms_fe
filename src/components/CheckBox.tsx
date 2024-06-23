import { selectConcernsType } from "@/common/types"
import { Checkbox } from "./ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"

type CProps = {
  id: string,
  name: string,
  hint?: string
  selectConcerns: selectConcernsType[]
  setSelectConcerns: React.Dispatch<React.SetStateAction<selectConcernsType[]>>
}

const CheckBox = ({ id, name, hint, setSelectConcerns, selectConcerns }: CProps) => {
  // if check box is checked, add it to the list of checked items
  // else filter the list of checked concerned for the item that is no longer checked
  const handleSelectBoxClicked = (checked: CheckedState) => {
    if (checked) {
      setSelectConcerns([...selectConcerns, { id: id, name: name, selected: true }])
    } else {
      const editedList = selectConcerns.filter(concern => (concern.id !== id))
      setSelectConcerns(editedList)
    }
  }

  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id={id}
        // checked={true}
        onCheckedChange={(checked) => {
          handleSelectBoxClicked(checked)
          return checked
        }}
      />

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
