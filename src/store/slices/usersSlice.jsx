import { createSlice, nanoid } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    isLoading(state, payload) {
      state.isLoading = true;
    },
  },
});

export const usersReducer = usersSlice.reducer;
