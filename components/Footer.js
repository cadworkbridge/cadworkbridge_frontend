'use client'

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 text-center py-4 mt-10 text-sm text-gray-600">
            © {new Date().getFullYear()} CadworkBridge. All rights reserved.
        </footer>
    )
}
