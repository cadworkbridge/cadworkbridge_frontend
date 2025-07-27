import '../styles/globals.css'
import { AppProviders } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeContext'

export const metadata = {
    title: 'CadworkBridge',
    description: 'Your trusted Cadwork solution platform',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="min-h-screen flex flex-col">
        <ThemeProvider>
            <AppProviders>
                <Navbar /> {/* 🔼 stays on top */}
                <main className="flex-grow"> {/* 🔁 fills vertical space */}
                    {children}
                </main>
                <Footer /> {/* 🔽 sticks to bottom on short pages */}
            </AppProviders>
        </ThemeProvider>
        </body>
        </html>

    )
}
