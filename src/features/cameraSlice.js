import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cameraImage: null,
};

export const cameraSlice = createSlice({
  name: "camera",
  initialState,

  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage: (state) => {
      state.cameraImage = null;
    },
  },
});

//we will have these two in order to dispatch the an action on to cameraSlice
export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

//pull information from the storage
export const selectCameraImage = (state) => state.camera.cameraImage;

export default cameraSlice.reducer;
