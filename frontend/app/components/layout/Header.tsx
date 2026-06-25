import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {usePathname} from "next/navigation";

const NAV_LINKS = [
    { name: 'Functions', href: '#function' },
    { name: 'Price', href: '#price' },
    { name: 'Blog', href: '#blog' },
    { name: 'For PT', href: '#pt' },
];

export default function HeaderLayout () {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <header className="bg-emerald-600 text-white backdrop-blur-md shadow-lg border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="md:hidden p-2 -ml-2  hover:bg-gray-100 hover:text-emerald-600 rounded-lg focus:outline-none"
                        >
                            {isMobileOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
                                </svg>
                            )}
                        </button>

                        <Link href="/" className="flex items-center">
                            <Image src="/images/logo-white.svg" width={180} height={100} className="w-44 h-auto" alt="Calofit Logo" />
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-2 h-full">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

                            return (
                                <Link
                                    href={link.href}
                                    key={link.name}
                                    className={`inline-flex items-center px-4 py-2 font-medium transition-colors ${
                                        isActive
                                            ? 'bg-white text-emerald-600'
                                            : 'bg-transparent hover:text-gray-200'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="hidden md:flex space-x-2 w-[25%]">
                        <Link href="/login" className="bg-emerald-600 hover:bg-emerald-700 border-2 border-white text-white py-2 px-3 rounded-xl text-sm font-medium transition-all">
                            Sign in
                        </Link>
                        <Link href="/onboarding" className="bg-white hover:bg-emerald-700 text-emerald-600 hover:text-white py-2 px-3 border-2 border-white rounded-xl text-sm font-medium transition-all">
                            Start for Free
                        </Link>
                    </div>
                </div>

            </div>

            {/* MENU MOBILE */}
            {isMobileOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 py-4 px-4 space-y-2 animate-fade-in-down">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

                        return (
                            <Link
                                href={link.href}
                                key={link.name}
                                onClick={() => setIsMobileOpen(false)}
                                className={`block px-4 py-3 font-medium rounded-xl transition-colors ${
                                    isActive
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {link.name}
                            </Link>
                        )
                    })}

                    {/* Mobile menu */}
                    <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-4">
                        <Link href="/login" className="w-full bg-emerald-600 hover:bg-emerald-700 text-center text-white px-4 py-3 rounded-xl font-medium transition-all">
                            Sign in
                        </Link>
                        <Link href="/onboarding" className="w-full hover:underline text-center text-emerald-600 py-2 px-3 rounded-xl font-medium transition-all">
                            Start for Free
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}