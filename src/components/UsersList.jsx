import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";

function UsersList() {
  //dispatch to dispatch action from our async thunk
  const dispatch = useDispatch();

  //useSelector to get access to ou state.users from the store
  const { data, isLoading, error } = useSelector((state) => state.users); // {data: [], isLoading: false, error: null}

  //Use effect to dispatch the fetchUsers async thunk
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  //Testing if the state from ou selector is working
  //Is the data being fetched?
  if (isLoading) {
    return <Skeleton times={5} className="h-10 w-full" />;
  }

  //Has the data failed to fetch?
  if (error) {
    return <div>Error loading data...</div>;
  }

  //Has the data been fetched succesfully?
  return <div>{data.length} users loaded</div>;
}

export default UsersList;
