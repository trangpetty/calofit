'use client'

import {signIn} from "next-auth/react";
import {Button} from "@/app/ui/button";
import {ArrowLeftIcon} from "@phosphor-icons/react";
import {useState} from "react";
import {useRouter} from "next/navigation";

interface AuthStepProps {
    onBack: () => void;
    onSuccess?: () => void;
}

export function AuthStep({onBack, onSuccess}: AuthStepProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const pendingData = localStorage.getItem('pendingOnboardingData');
        const parsedData = pendingData ? JSON.parse(pendingData) : {};
        const displayName = parsedData.name || '';

        const res = await signIn('credentials', {
            email,
            password,
            displayName: displayName,
            redirect: false
        });

        if (res?.error) {
            setError("Sai email/mật khẩu hoặc lỗi kết nối. Vui lòng thử lại!");
            setIsLoading(false);
        } else {
            if (onSuccess) {
                onSuccess();
            }
        }
    }

    const handleGoogleLogin = () => {
        signIn('google', {callbackUrl: '/onboarding'});
    }

    return (
        <div className="md:p-8 animate-fade-in-up w-full max-w-md mx-auto">

            <div className="w-full relative flex items-center justify-center mb-8">
                <div className="absolute left-0 cursor-pointer hover:opacity-80 transition-opacity text-gray-900" onClick={onBack}>
                    <ArrowLeftIcon size={16} weight="bold" />
                </div>

                <h2 className="md:text-lg text-base font-extrabold text-gray-900 ml-4">
                    Almost there! Create your account.
                </h2>
            </div>

            <form onSubmit={handleEmailAuth}>
                <div className="space-y-3 mb-3 text-gray-900">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full p-4 border border-emerald-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                    />
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        className="w-full p-4 border border-emerald-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                    />
                    <p className="text-sm text-gray-600">Must be at least 10 characters, no spaces.</p>
                    <p className="text-xs text-gray-600">
                        <span>This site is protected by reCAPTCHA and the Google </span>
                        <span className="text-blue-600">Privacy Policy </span>
                        <span>and </span>
                        <span className="text-blue-600">Terms </span>
                        <span>apply.</span>
                    </p>
                </div>
                <label className="flex items-start gap-3 mb-8 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-600" />
                    <span className="text-sm text-gray-700">
                    <strong>Terms & Conditions</strong><br/>
                    <span className="text-gray-500">I agree to the Terms & Conditions and Privacy Policy.</span></span>
                </label>
                <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-900 text-white mb-4">
                    {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Continue'}
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
            <p className="text-sm text-gray-600">We will never post anything without your permission</p>
        </div>
    )
}