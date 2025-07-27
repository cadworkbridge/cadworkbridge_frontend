
'use client'

import { useState } from 'react'
import { resendActivation } from '@/lib/api/auth'

export default function ResendActivationPage() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        try {
            await resendActivation(email)
            setStatus('success')
        } catch {
            setStatus('error')
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-xl font-bold">Resend Activation Email</h1>
                <input
                    type="email"
                    className="border p-2 rounded"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Send Email
                </button>
                {status === 'success' && <p className="text-green-600">Email sent!</p>}
                {status === 'error' && <p className="text-red-600">Error sending email.</p>}
            </form>
        </main>
    )
}
