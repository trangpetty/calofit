'use client'

import {usePathname, useRouter} from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Fire, Bell, CaretDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Image from "next/image";

const NAV_LINKS = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Food', href: '/food-log' },
    { name: 'Workout', href: '/workout' },
    { name: 'Progress', href: '/progress' },
    { name: 'Reports', href: '/reports' },
    { name: 'AI coach', href: '/coach' },
];

export default function Header() {
    const router = useRouter();

    const pathname = usePathname();
    const { data: session, status } = useSession();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const handleLogout = async () => {
        await signOut({redirect: false});
        router.push('/');
    }

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

                    <div className="hidden md:flex space-x-2 h-full w-[25%]">
                        {status === 'loading' ? (
                            <div className="w-20 h-8 rounded-lg bg-gray-100 animate-pulse"></div>
                        ) : session ? (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 bg-orange-50 text-[#e65c00] px-3 py-1.5 rounded-full font-semibold text-sm cursor-default">
                                    <Fire size={18} weight="bold" />
                                    <span>12 ngày</span>
                                </div>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="relative rounded-xl bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm"
                                >
                                    <Bell size={30} weight="regular" />
                                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                </Button>

                                {/* 3. Dropdown User */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="border border-white">
                                        <button className="flex items-center gap-2.5 p-1 pr-2 hover:bg-gray-50 text-white hover:text-emerald-600 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
                                            <Avatar>
                                                <AvatarImage
                                                    src={session.user?.image ?? undefined}
                                                    alt={session.user?.name ?? ""}
                                                />
                                                <AvatarFallback>{session.user?.name}</AvatarFallback>
                                            </Avatar>

                                            <span className="text-sm font-bold">{session.user?.name}</span>

                                            <CaretDown size={14} weight="bold" />

                                        </button>
                                    </DropdownMenuTrigger>
                                    {/* Menu's content */}
                                        <DropdownMenuContent align="end" className="w-48 rounded-xl bg-white text-gray-900 px-3 py-2">
                                            <DropdownMenuItem className="cursor-pointer font-medium">
                                                Hồ sơ cá nhân
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer font-medium">
                                                Cài đặt
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem className="cursor-pointer font-medium text-red-500 focus:text-red-500 focus:bg-red-50" onClick={handleLogout}>
                                                Đăng xuất
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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