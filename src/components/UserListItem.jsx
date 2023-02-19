import { GoTrashcan, GoChevronDown } from "react-icons/go";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/useThunk";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";

function UserListItem({ user }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

  const handleDeleteUser = () => {
    doDeleteUser(user);
    console.log(user.id);
  };

  const header = (
    <>
      <div className="flex items-center">
        <Button
          loading={isLoading}
          onClick={handleDeleteUser}
          className="rounded-full bg-red-500"
        >
          <GoTrashcan className="text-white" />
        </Button>
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    </>
  );

  return <ExpandablePanel header={header}>CONTENT</ExpandablePanel>;
}

export default UserListItem;
