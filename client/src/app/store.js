import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/Auth/authSlice.js"
import themeReducer from "../features/Theme/themeSlice.js";
import chatReducer from "../features/Chat/chatSlice.js";
import socketReducer from "../features/Socket.io/socketSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        chat: chatReducer,
        socket: socketReducer
    }
})

export default store