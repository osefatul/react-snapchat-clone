import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  camerImage: null,
};

export const cameraSlice = createSlice({
  name: "camera",
  initialState,

  reducers: {
    setCameraImage: (state, action) => {
      state.camerImage = action.payload;
    },
    resetCameraImage: (state) => {
      state.camerImage = null;
    },
  },
});

//we will have these two in order to dispatch the an action on to cameraSlice
export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

//pull information from the storage
export const selectCameraImage = (state) => state.camera.value;

export default cameraSlice.reducer;
