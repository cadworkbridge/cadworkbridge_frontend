'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/api/auth'
import { useAppDispatch } from '@/hooks/useRedux'
import { fetchUser } from '@/features/authSlice'
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showResend, setShowResend] = useState(false)

    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setShowResend(false)

        try {
            await login(email, password)
            await dispatch(fetchUser())
            router.push('/')
        } catch (err) {
            const detail = err?.response?.data?.detail || ''
            setError(detail || 'Login failed')

            if (detail.includes('No active account')) {
                setShowResend(true)
            }
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

                {showResend && (
                    <Link
                        href="/auth/resend"
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Resend activation email
                    </Link>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>

                <Link
                    href="/reset-password"
                    className="text-sm text-blue-500 hover:underline mt-2 block"
                >
                    Forgot password?
                </Link>
            </form>
        </main>
    )
}
