// frontend/features/Socket.io/socketThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "../../lib/socket.js";
import { setOnlineUsers } from "./socketSlice.js";

export const connectSocket = createAsyncThunk(
  "socket/connect",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.authUser;

    if (!user) {
      console.warn("connectSocket: No user found, skipping connection");
      return thunkAPI.rejectWithValue("No authenticated user");
    }

    if (socket.connected) {
      return;
    }
    
    socket.io.opts.query = { userId: user._id };
    socket.connect();

    socket.off("getOnlineUsers");
    socket.on("getOnlineUsers", (userIds) => {
      thunkAPI.dispatch(setOnlineUsers(userIds));
    });

    socket.off("newMessage");
  }
);

export const disconnectSocket = createAsyncThunk(
  "socket/disconnect",
  async () => {
    if (socket.connected) {
      socket.disconnect();
    }
  }
);