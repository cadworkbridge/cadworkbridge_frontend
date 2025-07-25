import axios from '@/lib/axios'

// POST: Login with credentials
export const login = (email, password) => {
    return axios.post('users/jwt/create/', { email, password })
}

// GET: Fetch current user using the cookie
export const fetchUser = () => {
    return axios.get('/users/me/')
}

// POST: Convert session to JWT
export const sessionToJWT = () => {
    return axios.post('users/session-to-jwt/')
}

// POST: Login via Google or social provider
export const loginWithProvider = (provider, accessToken) => {
    return axios.post('users/jwt/provider/', { provider, access_token: accessToken })
}

// POST: Refresh access token using HttpOnly cookie
export const refreshToken = () => {
    return axios.post('users/jwt/refresh/')
}

// POST: Verify token
export const verifyToken = () => {
    return axios.post('users/jwt/verify/')
}

// POST: Logout (clears cookies on backend)
export const logout = () => {
    return axios.post('users/logout/')
}

// POST: Register new user
export const register = (email, password, first_name) => {
    return axios.post('auth/users/', { email, password, first_name })
}
