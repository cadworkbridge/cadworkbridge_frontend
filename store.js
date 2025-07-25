import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'

// Create the Redux store
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})
