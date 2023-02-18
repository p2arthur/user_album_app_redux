import { GoTrashcan } from "react-icons/go";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/useThunk";
import Button from "./Button";

function UserListItem({ user }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

  const handleDeleteUser = () => {
    doDeleteUser(user);
    console.log(user.id);
  };

  return (
    <div className="mb-2 border rounded flex items-center p-3">
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
  );
}

export default UserListItem;
