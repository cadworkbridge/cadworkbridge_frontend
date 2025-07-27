'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { activateUser } from '@/lib/api/auth'

export default function ActivationPage() {
    const { uid, token } = useParams()
    const router = useRouter()
    const [status, setStatus] = useState('pending') // 'pending', 'success', 'error'

    useEffect(() => {
        const activate = async () => {
            try {
                await activateUser(uid, token)
                setStatus('success')
                setTimeout(() => router.push('/login'), 2000)
            } catch {
                setStatus('error')
            }
        }

        if (uid && token) activate()
    }, [uid, token, router])

    return (
        <main className="min-h-screen flex items-center justify-center">
            {status === 'pending' && <p>Activating your account...</p>}
            {status === 'success' && <p className="text-green-600">Account activated! Redirecting to login...</p>}
            {status === 'error' && <p className="text-red-600">Activation failed. The link may be invalid or expired.</p>}
        </main>
    )
}
