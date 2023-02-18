import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { deleteUser } from "../thunks/deleteUser";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  //Creating extraReducers to watch for the response type from our fetchUsers async thunk types
  extraReducers(builder) {
    //--------------------------------------------------------------------------
    //Add extra reducers for the fetchUsers thunk
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

    //--------------------------------------------------------------------------
    //Extra reducers for the addUser thunk
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //--------------------------------------------------------------------------
    //Extra reducers for the deleteUser thunk
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      //BUG
      console.log(action);
      state.data = state.data.filter((user) => user.id !== action.payload.id);
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      console.log(action);
    });
    //--------------------------------------------------------------------------
  },
});

export const usersReducer = usersSlice.reducer;
