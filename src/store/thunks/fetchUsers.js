import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Creating a Thunk to fetch users data - An action with type users/fetch/pending... will be authomatically dispatched
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  //DEV ONLY!! - Calling the pause helper to give time for our loading proccess
  await pause(5000);

  //This return will be automatically assigned as a payload when the thunk gets dispatched
  return response.data;
});

//DEV ONLY!!! - Helper function to pause the fetching for testing purposes
const pause = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

/*Automatic types: 
fetchUser.pending === 'users/fetch/pending'
fetchUser.fulfilled === 'users/fetch/fulfilled'
fetchUser.rejected === 'users/fetch/rejected'
*/

export { fetchUsers };
