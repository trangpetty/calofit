'use client'

import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Food', href: '/food' },
    { name: 'Exercises', href: '/exercises' },
];

export default function Header() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <header className="bg-emerald-600 text-white backdrop-blur-md shadow-lg border-b sticky top-0 z-50 relative">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="md:hidden p-2 -ml-2  hover:bg-gray-100 rounded-lg focus:outline-none"
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
                            <img src="/images/logo-white.svg" alt="Calofit Logo" className="w-44" />
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

                    <div className="hidden md:flex items-center gap-4">
                        {status === 'loading' ? (
                            <div className="w-20 h-8 rounded-lg bg-gray-100 animate-pulse"></div>
                        ) : session ? (
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <div className="hidden sm:block">
                                    <span>Hi, </span>
                                    <span className="font-extrabold tracking-wide ml-1">
                                        {session.user?.name || session.user?.email}
                                    </span>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="hover:text-gray-200 cursor-pointer transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-sm shadow-emerald-200"
                            >
                                Đăng nhập
                            </button>
                        )}
                    </div>
                </div>

            </div>

            {/* MENU MOBILE THẢ XUỐNG: Dùng absolute để nổi lên trên, không xô đẩy layout */}
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

                    {/* Phần Auth cho Mobile cũng được gom vào menu này */}
                    <div className="pt-4 mt-2 border-t border-gray-100">
                        {session ? (
                            <div className="flex flex-col gap-3">
                                <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
                                    Đang đăng nhập: <span className="font-bold text-emerald-600">{session.user?.name || session.user?.email}</span>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full text-center px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl font-medium transition-all"
                            >
                                Đăng nhập
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}