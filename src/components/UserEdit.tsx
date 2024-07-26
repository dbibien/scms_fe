import { Pencil } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useApplicationStore, useLoggedInUserStore } from "@/common/store"
import { useState } from "react"
import { userType } from "@/common/types"

type CProps = {
  user: userType,
  // openUserCreationCard: boolean,
  // setOpenUserCreationCard: React.Dispatch<React.SetStateAction<boolean>>,
  // getUsersData: () => Promise<void>,
}

const formSchema = z.object({
  first_name: z.string().min(1, { message: "First name must not be empty" }).max(30, { message: "First name must not exceed 30 characters" }),
  last_name: z.string().min(1, { message: "Last name must not be empty" }).max(30, { message: "Last name must not exceed 30 characters" }),
  email: z.string().min(1, { message: "Email must be at least one character long" }).email("Not a valid email"),
  type: z.string().min(1, { message: "Invalid type" }),
})

const UserEdit = ({ user }: CProps) => {
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      type: user?.type,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    // console.log("values: ", values)
    try {
      const createUserData = {
        first_name: values?.first_name,
        last_name: values?.last_name,
        type: values?.type,
        email: values?.email,
        emailVisibility: true,
        password: "skdkoowoieoijja232432nklniaah",
        passwordConfirm: "skdkoowoieoijja232432nklniaah",
        community: loggedInUserCommunityId,
      }
      await pb.collection("users").create(createUserData, {
        fields: "id, first_name, last_name, email, type",
      })
      // console.log("createdUser: ", createdUser)

      await getUsersData()
      form.reset({
        first_name: "",
        last_name: "",
        email: "",
        type: "",
      })

      toast({
        variant: "default",
        title: "Success",
        description: "New user added"
      })

      setOpenUserCreationCard(false)
    } catch (e) {
      // @ts-expect-error expected
      const err = e?.data
      const validationRequired = "validation_required"
      if (err?.code === 400) {
        const errData = err?.data
        if (errData?.password?.code === validationRequired ||
          errData?.passwordConfirm?.code === validationRequired
        ) {
          toast({
            variant: "destructive",
            title: "Failure",
            description: "Passwords do not match"
          })
        }
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Pencil />
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetTitle className="text-center">
          Update User
        </SheetTitle>

      </SheetContent>
    </Sheet>
  )
}

export default UserEdit
