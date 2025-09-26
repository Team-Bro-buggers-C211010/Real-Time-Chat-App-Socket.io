import { createSlice } from "@reduxjs/toolkit";
import { fetchLastMessages, sendMessage } from "./chatThunk.js";

const initialState = {
  chatMessages: [],
  lastMessagesForAllSidebarsUsers: [],
  selectedUser: null,
  isChatLoading: false,
  isLastMessagesLoading: false,
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
      })
      .addCase(fetchLastMessages.pending, (state) => {
        state.isLastMessagesLoading = true;
      })
      .addCase(fetchLastMessages.fulfilled, (state, action) => {
        state.lastMessagesForAllSidebarsUsers = action.payload || [];
        state.isLastMessagesLoading = false;
      })
      .addCase(fetchLastMessages.rejected, (state) => {
        state.isLastMessagesLoading = false;
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
