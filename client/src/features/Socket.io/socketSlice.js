import { createSlice } from "@reduxjs/toolkit";
import { connectSocket, disconnectSocket } from "./socketThunk.js";

const initialState = {
  isConnected: false,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectSocket.fulfilled, (state) => {
        state.isConnected = true;
      })
      .addCase(disconnectSocket.fulfilled, (state) => {
        state.isConnected = false;
        state.onlineUsers = [];
      });
  },
});

export const { setOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;