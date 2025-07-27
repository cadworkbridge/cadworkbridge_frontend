'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { confirmResetPassword } from '@/lib/api/auth'

export default function ResetPasswordConfirmPage() {
    const router = useRouter()
    const { uid, token } = useParams()

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            await confirmResetPassword(uid, token, newPassword)
            setSuccess(true)
            setTimeout(() => router.push('/login'), 2000)
        } catch (err) {
            setError('Invalid or expired reset link')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <h2 className="text-xl mb-4 font-bold">Reset Password</h2>

            {success ? (
                <p className="text-green-600">Password reset successful! Redirecting to login...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full mb-3 p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full mb-3 p-2 border rounded"
                    />
                    {error && <p className="text-red-600 mb-3">{error}</p>}
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                        Reset Password
                    </button>
                </form>
            )}
        </div>
    )
}
