'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/hooks/useRedux'
import { fetchUser } from '@/features/authSlice'
import { register } from '@/lib/api/auth'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await register(email, password, firstName)
            setError('')  // Clear any previous errors
            alert('Registration successful! Please check your email to activate your account.')
            router.push('/login') // Redirect to login instead of home
        } catch (err) {
            const message =
                err?.response?.data?.detail || err?.message || 'Registration failed'
            setError(message)
        }
    }

    return (
        <main className="min-h-screen flex flex-col justify-center items-center px-4">
            <h1 className="text-2xl font-bold mb-4">Register</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <input
                    type="text"
                    className="w-full border px-4 py-2 rounded"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

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
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Register
                </button>
            </form>
        </main>
    )
}
