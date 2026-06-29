"use client"

import {signIn} from "next-auth/react";
import Image from "next/image";
import {Button} from "@/app/ui/button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Link from "next/link";
import {Turnstile} from "@marsidev/react-turnstile";

export default function LoginPage () {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const res = await signIn('credentials', {
            email,
            password,
            displayName: '',
            redirect: false,
        });

        if (res?.error) {
            setError("Sai email/mật khẩu hoặc lỗi kết nối. Vui lòng thử lại!");
            setIsLoading(false);
        } else {
            router.push('/dashboard');
        }
    }

    const handleGoogleLogin = () => {
        signIn('google', {callbackUrl: '/onboarding'});
    }
    return (
        <main className="min-h-screen flex items-center">
            <div className="hidden h-screen md:block md:w-2/3 md:shrink-0 md:grow-0 bg-gradient-to-bl from-emerald-600 from-[60%] to-emerald-400 to-[100%] justify-center">
                <div className="w-full h-full flex justify-center items-center">
                    <Image src="/images/logo-text-under.svg" width={180} height={100} className="w-1/3 h-auto" alt="Calofit Logo" />
                </div>
            </div>
            <div className="p-8 animate-fade-in-up w-full h-screen md:w-1/3 flex flex-col justify-center">

                <div className="w-full text-start mb-4">
                    <h2 className="text-lg font-extrabold text-gray-900">
                        Member Login
                    </h2>
                </div>

                <form onSubmit={handleEmailAuth} className="flex flex-col justify-center gap-4">
                    <div className="space-y-6 mb-3 text-gray-900">
                        <div className="relative">
                            <span className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                                Email
                            </span>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full p-4 border border-emerald-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                            />
                        </div>

                        <div className="relative">
                            <span className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                                Password
                            </span>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                className="w-full p-4 border border-emerald-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                            />
                            <div className="flex justify-end">
                                <Link href="#" className="text-[14px] text-emerald-600 hover:underline mt-2">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
                        <Turnstile
                            siteKey="1x00000000000000000000AA"
                            options={{
                                theme: 'light',
                            }}
                            onSuccess={(token) => {
                                console.log("Token:", token);
                            }}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-emerald-600 hover:bg-emerald-900 text-white mb-4 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="mr-3 size-5 animate-spin text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : 'Login'}
                    </Button>
                </form>

                <div className="relative flex items-center justify-center mb-4">
                    <div className="absolute border-t border-gray-200 w-full"></div>
                    <span className="px-4 text-gray-500 text-sm relative z-10 bg-white">or</span>
                </div>

                <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center gap-3 mb-4"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Continue with Google
                </Button>
                <div className="flex items-center justify-center gap-2">
                    <p className="text-sm text-gray-600">Not a member yet? </p>
                    <Link href="/onboarding" className="text-emerald-600">
                        Sign up now!
                    </Link>
                </div>
            </div>
        </main>
    );
}
