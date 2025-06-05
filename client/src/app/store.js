import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/Auth/authSlice"
import themeReducer from "../features/Theme/themeSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
    }
})

export default store