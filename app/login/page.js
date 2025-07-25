'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/api/auth'
import { useAppDispatch } from '@/hooks/useRedux'
import { fetchUser } from '@/features/authSlice'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await login(email, password)
            await dispatch(fetchUser())
            router.push('/')
        } catch (err) {
            const message =
                err?.response?.data?.detail || err?.message || 'Login failed'
            setError(message)
        }
    }

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <input
                    type="email"
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </main>
    )
}
