'use client'

import { useState } from 'react'
import { resetPassword } from '@/lib/api/auth'

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        try {
            await resetPassword(email)
            setSuccess(true)
        } catch (err) {
            setError('Something went wrong. Please try again.')
        }
    }

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <input
                    type="email"
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {success && (
                    <p className="text-green-600 text-sm">
                        If an account exists, a reset link has been sent to your email.
                    </p>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Send Reset Link
                </button>
            </form>
        </main>
    )
}
