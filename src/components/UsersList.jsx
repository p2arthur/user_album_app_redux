import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { useThunk } from "../hooks/useThunk";
import Button from "./Button";
import Skeleton from "./Skeleton";

function UsersList() {
  //Creating a component level state to handle fine-grain loading
  //--------------------------------------------------------------------------
  //Refactor to use our useThunk custom hook
  const [doFetchUsers, isLoadingUsers, isLoadingUsersError] =
    useThunk(fetchUsers);

  const [doCreateUser, isCreatingUser, isCreatingUserError] = useThunk(addUser);

  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //useSelector to get access to ou state.users from the store
  const { data } = useSelector((state) => state.users);
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //Use effect to dispatch the fetchUsers async thunk
  useEffect(() => {
    try {
      doFetchUsers();
    } catch (error) {
      console.error(error);
    }
  }, [doFetchUsers]);
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  const handleUserAdd = () => {
    try {
      doCreateUser();
    } catch (error) {
      console.error(error);
    }
  };
  //--------------------------------------------------------------------------

  //Testing if the state from ou selector is working
  //Is the data being fetched?

  //Has the data failed to fetch?
  if (isLoadingUsersError) {
    return <div>Error loading data... {isLoadingUsersError.message}</div>;
  }

  //Rendering each user
  const renderedUsers = data.map((user) => (
    <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  ));

  //Has the data been fetched succesfully?
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m2 text-xl">Users</h1>

        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add new user
        </Button>

        {isCreatingUserError && "Error creating user..."}
      </div>
      {isLoadingUsers ? <Skeleton times={10} className="w-full h-10" /> : null}
      {renderedUsers}
    </div>
  );
}

export default UsersList;
