import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteUser = createAsyncThunk("users/remove", async (user) => {
  await axios.delete(`http://localhost:3005/users/${user.id}`);

  //DEV ONLY!
  await stop(2000);

  return user;
});

//DEV ONLY!
const stop = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export { deleteUser };
