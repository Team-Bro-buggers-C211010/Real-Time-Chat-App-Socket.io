import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "./authThunk";

const initialState = {
  authUser: null,
  isSignUp: false,
  isLogin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
        state.authUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      });
  },
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
