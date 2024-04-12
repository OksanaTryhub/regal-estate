import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  // setLoading
} = userSlice.actions;

export default userSlice.reducer;
