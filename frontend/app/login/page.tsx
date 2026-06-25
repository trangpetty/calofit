"use client"

import {signIn, signOut, useSession} from "next-auth/react";

export default function LoginPage () {
    const {data: session, status} = useSession();
    if (status == "loading") {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8 text-blue-600">Calofit App</h1>
            {session ? (
                <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                    {/* Lấy Avatar từ Google */}
                    {session.user?.image && (
                        <img src={session.user.image} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-4" />
                    )}
                    <h2 className="text-2xl font-semibold">{session.user?.name}</h2>
                    <p className="text-gray-600 mb-2">{session.user?.email}</p>

                    {/* Đây là Role do Spring Boot trả về! */}
                    <p className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold mb-6">
                        Vai trò: {(session.user as any)?.role || "Đang cập nhật..."}
                    </p>

                    <br />
                    <button
                        onClick={() => signOut()}
                        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Đăng xuất
                    </button>
                </div>
            ) : (
                /* NẾU CHƯA ĐĂNG NHẬP */
                <button
                    onClick={() => signIn("google")}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                    Đăng nhập bằng Google
                </button>
            )}
        </main>
    );
}
