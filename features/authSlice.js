import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@/lib/axios' // Axios instance with base URL and config

// Initial state for auth slice
const initialState = {
    user: null,       // Will hold logged-in user data
    loading: false,   // Loading state for async actions
}

// Async thunk: fetch the current logged-in user from backend
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const res = await axios.get('/auth/users/me/') // API call to get user
    return res.data // This becomes action.payload
})

// Create auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null // Clear user data on logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true // Set loading while request is in progress
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload // Set user from API response
                state.loading = false      // Done loading
            })
            .addCase(fetchUser.rejected, (state) => {
                state.user = null          // Clear user if fetch fails
                state.loading = false      // Done loading
            })
    },
})

// Export logout action and reducer
export const { logout } = authSlice.actions
export default authSlice.reducer
