'use client'

import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { logout } from '@/features/authSlice'
import { logout as logoutAPI } from '@/lib/api/auth'
import { useTheme } from '@/context/ThemeContext'

export default function Navbar() {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.auth.user)
    const { theme, toggleTheme } = useTheme() // ⬅️ Access theme context

    const handleLogout = async () => {
        await logoutAPI()
        dispatch(logout())
    }

    const bgColor = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'

    return (
        <nav className={`w-full ${bgColor} px-6 py-3`}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                {/* Left: Logo + Main links */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Link href="/" className="text-lg font-bold">
                        CadworkBridge
                    </Link>
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </div>

                {/* Right: Auth + Theme toggle */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="border px-3 py-1 rounded text-sm"
                    >
                        Toggle Theme
                    </button>

                    {user ? (
                        <>
                            <span className="text-sm">Hi, {user.email}</span>
                            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm text-white">
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
            </div>
        </nav>
    )
}
