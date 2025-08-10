import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./chatThunk";

const initialState = {
  chatMessages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isChatLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPushNewChatMessages: (state, action) => {
      if (action.payload && action.payload._id) {
        state.chatMessages.push(action.payload);
      }
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setIsUserLoading: (state, action) => {
      state.isUserLoading = action.payload;
    },
    setIsChatLoading: (state, action) => {
      state.isChatLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("chat/fetchChatMessages/pending", (state) => {
        state.isChatLoading = true;
      })
      .addCase("chat/fetchChatMessages/fulfilled", (state, action) => {
        state.chatMessages = action.payload || [];
        state.isChatLoading = false;
      })
      .addCase("chat/fetchChatMessages/rejected", (state) => {
        state.isChatLoading = false;
      })
      .addCase("chat/fetchUsers/pending", (state) => {
        state.isUserLoading = true;
      })
      .addCase("chat/fetchUsers/fulfilled", (state, action) => {
        state.users = action.payload;
        state.isUserLoading = false;
      })
      .addCase("chat/fetchUsers/rejected", (state) => {
        state.isUserLoading = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isChatLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        if (action.payload && action.payload._id) {
          state.chatMessages.push(action.payload);
        }
        state.isChatLoading = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isChatLoading = false;
      });
  },
});

export const {
  setPushNewChatMessages,
  setUsers,
  setSelectedUser,
  setIsUserLoading,
  setIsChatLoading,
} = chatSlice.actions;
export default chatSlice.reducer;
