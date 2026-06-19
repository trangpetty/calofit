// app/onboarding/components/SuccessScreen.tsx

import { useRouter } from 'next/navigation';
import { ProfileResult } from '@/types/onboarding';
import {useState} from "react";
import {CalorieCalculator} from "@/app/onboarding/components/CalorieCalculator";

const CheckCircle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
    </svg>
);

interface Props {
    data: ProfileResult;
}

export function SuccessScreen({ data }: Props) {
    const router = useRouter();

    const [showCalculator, setShowCalculator] = useState(false);

    return (
        <>
            {!showCalculator && (
                <div className="flex flex-col items-center text-center animate-fade-in-up p-8">
                    <div className="mb-4">
                        <CheckCircle />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Hồ sơ hoàn tất!</h2>
                    <p className="text-gray-500 mt-2 mb-6">
                        Chúng tôi đã thiết kế kế hoạch dinh dưỡng riêng cho bạn.
                    </p>

                    <div className="w-full bg-emerald-50 p-6 rounded-2xl text-left space-y-4">
                        <div className="flex justify-between items-center border-b border-emerald-100 pb-3">
                            <span className="text-emerald-800 font-medium">Mục tiêu Calo hằng ngày</span>
                            <span className="text-2xl font-bold text-emerald-600">
                    {data?.dailyCaloriesGoal}{' '}
                                <span className="text-sm font-normal">kcal</span>
                  </span>
                        </div>

                        <div>
                  <span className="text-sm font-medium text-gray-600 block mb-2">
                    Phân bổ chất dinh dưỡng (Macros)
                  </span>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Đạm',      value: data?.proteinTarget, color: 'text-blue-600' },
                                    { label: 'Tinh bột', value: data?.carbsTarget,   color: 'text-amber-600' },
                                    { label: 'Chất béo', value: data?.fatTarget,     color: 'text-rose-500' },
                                ].map(({ label, value, color }) => (
                                    <div key={label} className="bg-white p-3 rounded-lg text-center border border-gray-100 shadow-sm">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                                        <div className={`font-bold ${color}`}>{value}g</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowCalculator(true)}
                        className="w-full bg-emerald-600 text-white font-medium py-4 rounded-xl mt-6 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                    >
                        Bắt đầu theo dõi hành trình
                    </button>
                </div>
            )}

            {showCalculator && (
                <CalorieCalculator data={data?.tdee} onBack={() => setShowCalculator(false)}/>
            )}
        </>
    );
}
