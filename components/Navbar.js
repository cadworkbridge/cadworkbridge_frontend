'use client'

import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { logout } from '@/features/authSlice'
import { logout as logoutAPI } from '@/lib/api/auth'

export default function Navbar() {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.auth.user)

    const handleLogout = async () => {
        await logoutAPI()
        dispatch(logout())
    }

    return (
        <nav className="w-full bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
            <Link href="/" className="text-lg font-bold">CadworkBridge</Link>

            <div className="space-x-4">
                {user ? (
                    <>
                        <span className="text-sm">Hi, {user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="hover:underline">Login</Link>
                        <Link href="/register" className="hover:underline">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}
