import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";

function UsersList() {
  //Creating a component level state to handle fine-grain loading
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setIsCreatingUserError] = useState(null);

  //dispatch to dispatch action from our async thunk
  const dispatch = useDispatch();

  //useSelector to get access to ou state.users from the store
  const { data } = useSelector((state) => state.users); // {data: [], isLoading: false, error: null}

  //Use effect to dispatch the fetchUsers async thunk
  useEffect(() => {
    try {
      //Set the loading state on UsersList first renders
      setIsLoadingUsers(true);
      //Detect when the fetchUsers promise is fulfilled
      dispatch(fetchUsers())
        .unwrap()
        .catch((error) => setLoadingUsersError(error))
        .finally(() => setIsLoadingUsers(false));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const handleUserAdd = () => {
    try {
      setIsCreatingUser(true);
      dispatch(addUser())
        .unwrap()
        .then((a) => console.log("new user Created", a.name))
        .catch((error) => setIsCreatingUserError(error))
        .finally(() => setIsCreatingUser(false));
    } catch (error) {
      console.error(error);
    }
  };

  //Testing if the state from ou selector is working
  //Is the data being fetched?
  if (isLoadingUsers) {
    return <Skeleton times={100} className="h-10 w-full" />;
  }

  //Has the data failed to fetch?
  if (loadingUsersError) {
    return <div>Error loading data... {loadingUsersError.message}</div>;
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
        {isCreatingUser ? (
          "Creating user..."
        ) : (
          <Button onClick={handleUserAdd}>+ Add new user</Button>
        )}
        {creatingUserError && "Error creating user..."}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
