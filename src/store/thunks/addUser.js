import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

//New thunk to post a random user to our database
const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3005/users", {
    name: faker.name.fullName(),
  });

  await pause(3000);

  return response.data;
});

const pause = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export { addUser };
