import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  status: "idle",
};

export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {},
});

export const { increment, decrement, incrementByAmount } = appSlice.actions;

export const selectApp = (state) => state.app.value;

export default appSlice.reducer;
