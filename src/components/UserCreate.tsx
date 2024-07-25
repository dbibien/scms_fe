type CProps = {
  openUserCreationCard: boolean,
  setOpenUserCreationCard: React.Dispatch<React.SetStateAction<boolean>>,
  getUsersData: () => Promise<void>,
}

const UserCreate = ({ openUserCreationCard, setOpenUserCreationCard, getUsersData }: CProps) => {
  return (
    <p>User Create</p>
  )
}

export default UserCreate
