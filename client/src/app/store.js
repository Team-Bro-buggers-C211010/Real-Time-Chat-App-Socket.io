import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/Auth/authSlice"
import themeReducer from "../features/Theme/themeSlice";
import chatReducer from "../features/Chat/chatSlice";
import socketReducer from "../features/Socket.io/socketSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        chat: chatReducer,
        socket: socketReducer
    }
})

export default store