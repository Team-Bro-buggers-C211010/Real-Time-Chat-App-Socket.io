import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../features/Auth/authSlice'

const store = configureStore({
    reducer: {
        auth: authSlice
    }
})

export default store