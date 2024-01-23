// Redux/Slice/addressSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const addressSlice = createSlice({
  name: 'address',
  initialState: {},
  reducers: {
    setToAddress: (state, action) => {
      return action.payload.address; 
    },
    
    resetAddress: (state, action) => {
      return {};
    }
  }
});

export const { setToAddress, resetAddress } = addressSlice.actions;

export default addressSlice.reducer;
