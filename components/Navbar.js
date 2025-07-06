import Link from 'next/link';

const Navbar = () => {
    return (
        <header>
            <nav className="flex justify-between items-center p-4 bg-gray-800">
                {/* Left Section: Logo, Home, Contact */}
                <div className="flex space-x-4">
                    <Link href="/" className="text-white text-lg font-bold">
                        Logo
                    </Link>
                    <Link href="#home" className="text-white hover:text-gray-400">
                        Home
                    </Link>
                    <Link href="#contact" className="text-white hover:text-gray-400">
                        Contact
                    </Link>
                </div>

                {/* Right Section: Sign In, Sign Up */}
                <div className="flex space-x-4">
                    <Link href="#signin" className="text-white hover:text-gray-400">
                        Sign In
                    </Link>
                    <Link href="#signup" className="text-white hover:text-gray-400">
                        Sign Up
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
