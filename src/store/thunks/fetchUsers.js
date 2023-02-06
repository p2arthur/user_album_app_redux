import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Creating a Thunk to fetch users data - An action with type users/fetch/pending... will be authomatically dispatched
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");
  return response.data;
});

export { fetchUsers };
