import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatMessages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isChatLoading: false,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatMessages: (state, action) => {
            state.chatMessages = action.payload;
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
            // Fetch Chat Messages
            .addCase('chat/fetchChatMessages/pending', (state) => {
                state.isChatLoading = true;
            })
            .addCase('chat/fetchChatMessages/fulfilled', (state, action) => {
                state.chatMessages = action.payload;
                state.isChatLoading = false;
            })
            .addCase('chat/fetchChatMessages/rejected', (state) => {
                state.isChatLoading = false;
            })

            // Fetch Users
            .addCase('chat/fetchUsers/pending', (state) => {
                state.isUserLoading = true;
            })
            .addCase('chat/fetchUsers/fulfilled', (state, action) => {
                state.users = action.payload;
                state.isUserLoading = false;
            })
            .addCase('chat/fetchUsers/rejected', (state) => {
                state.isUserLoading = false;
            });
    }
});

export const { setChatMessages, setUsers, setSelectedUser, setIsUserLoading, setIsChatLoading } = chatSlice.actions;
export default chatSlice.reducer;