import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setToUser: (state, action) => {
      return action.payload.name;
    },
    resetUser: (state, action) => {
      return null;
    }
  }
});

export const { setToUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
