import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/Auth/authSlice"
import themeReducer from "../features/Theme/themeSlice";
import chatReducer from "../features/Chat/chatSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        chat: chatReducer
    }
})

export default store