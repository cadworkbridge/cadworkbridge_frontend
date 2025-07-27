'use client'

import { createContext, useContext, useState, useEffect } from 'react'

// Create context
const ThemeContext = createContext()

// Custom provider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')

    // Load theme from localStorage (optional)
    useEffect(() => {
        const stored = localStorage.getItem('theme')
        if (stored) setTheme(stored)
    }, [])

    // Save theme to localStorage (optional)
    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Hook to use theme context
export const useTheme = () => useContext(ThemeContext)
