import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, signupUser } from "./authThunk";

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
      })
      // signupUser
      .addCase(signupUser.pending, (state) => {
        state.isSignUp = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        console.log(state.authUser)
        state.isSignUp = false;
      })
      .addCase(signupUser.rejected, (state) => {
        state.authUser = null;
        state.isSignUp = false;
      });
  },
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
