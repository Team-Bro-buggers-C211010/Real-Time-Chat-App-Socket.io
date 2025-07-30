// frontend/features/Socket.io/socketThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "../../lib/socket";
import { setOnlineUsers } from "./socketSlice";

export const connectSocket = createAsyncThunk(
  "socket/connect",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.authUser;
    console.log("connectSocket - Auth state:", state.auth);

    if (!user) {
      console.warn("connectSocket: No user found, skipping connection");
      return thunkAPI.rejectWithValue("No authenticated user");
    }
    if (socket.connected) {
      console.log("connectSocket: Socket already connected");
      return;
    }

    console.log("Connecting socket without query");
    socket.connect();

    socket.off("getOnlineUsers");
    socket.on("getOnlineUsers", (userIds) => {
      console.log("Received online users:", userIds);
      thunkAPI.dispatch(setOnlineUsers(userIds));
    });

    socket.off("newMessage");
    socket.on("newMessage", (newMessage) => {
      const selectedUser = state.chat.selectedUser;
      if (newMessage.senderId === selectedUser?._id) {
        console.log("Received new message:", newMessage);
      }
    });
  }
);

export const disconnectSocket = createAsyncThunk(
  "socket/disconnect",
  async () => {
    if (socket.connected) socket.disconnect();
  }
);