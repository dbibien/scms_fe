import { selectConcernsType } from "@/common/types"
import { Checkbox } from "./ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useToast } from "./ui/use-toast"

type CProps = {
  id: string,
  name: string,
  hint?: string,
  checked: boolean,
  selectConcerns: selectConcernsType[],
  setSelectConcerns: React.Dispatch<React.SetStateAction<selectConcernsType[]>>,
}

const CheckBox = ({ id, name, hint, checked, setSelectConcerns, selectConcerns }: CProps) => {
  const { toast } = useToast()

  const handleSelectBoxClicked = (checked: CheckedState) => {
    if (checked) {
      if (selectConcerns.length === 3) { // limit the amount of concerns that can be selected at a time to only three
        toast({
          variant: "destructive",
          title: "Limit Exceeded",
          description: "Only three concerns can be selected at a time."
        })
        return
      }
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
        checked={checked}
        onCheckedChange={(checked) => {
          handleSelectBoxClicked(checked)
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
