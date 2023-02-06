import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  //Creating extraReducers to watch for the response type from our fetchUsers async thunk types
  extraReducers(builder) {
    //When a thunk is created it has three automatic properties - thunk.pending, thunk.fulfilled, thunk.rejected
    builder.addCase(fetchUsers.pending, (state, action) => {
      //Update the state to show the user we're loading data
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      //Update the state to show the user the data is loaded
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      //Update the state to show the user the fetching failed
      state.isLoading = false;
      //The thunk will return an error object when the fetch fails
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
