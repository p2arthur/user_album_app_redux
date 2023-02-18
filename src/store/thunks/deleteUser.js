import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteUser = createAsyncThunk("users/remove", async (user) => {
  const response = await axios.delete(`http://localhost:8000/users/${user.id}`);

  //BUG FIX!!
  return response.data;
});

export { deleteUser };
