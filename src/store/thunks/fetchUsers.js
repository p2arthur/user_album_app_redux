import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Creating a Thunk to fetch users data - An action with type users/fetch/pending... will be authomatically dispatched
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  //This return will be automatically assigned as a payload when the thunk gets dispatched
  return response.data;
});

/*Automatic types: 
fetchUser.pending === 'users/fetch/pending'
fetchUser.fulfilled === 'users/fetch/fulfilled'
fetchUser.rejected === 'users/fetch/rejected'
*/

export { fetchUsers };
