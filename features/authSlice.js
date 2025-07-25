import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@/lib/axios' // Shared axios instance

// Initial state
const initialState = {
    user: null,
    loading: false,
}

// Async thunk: fetch logged-in user
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const res = await axios.get('/auth/users/me/')
    return res.data
})

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
            })
            .addCase(fetchUser.rejected, (state) => {
                state.user = null
                state.loading = false
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
