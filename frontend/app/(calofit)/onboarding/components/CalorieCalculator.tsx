// app/onboarding/components/SuccessScreen.tsx

import { useRouter } from 'next/navigation';
import {useMemo, useState} from "react";
import {ArrowLeftIcon} from "@phosphor-icons/react";

interface CalorieCalculatorProps {
    data: number;
    onBack: () => void;
}

export function CalorieCalculator({data, onBack}: CalorieCalculatorProps) {
    const router = useRouter();

    const width = "500px";
    const height = "500px";
    const [tdee, setTdee] = useState<number>(data);
    const [weightLossGoal, setWeightLossGoal] = useState<number>(0.5);

    const dailyDeficit = useMemo(() => {
        return Math.round((weightLossGoal * 7700) / 7);
    }, [weightLossGoal]);

    const dailyIntake = useMemo(() => {
        return Math.round(tdee - dailyDeficit);
    }, [tdee, dailyDeficit]);

    const isDangerouslyLow = dailyIntake < 1200;

    return (
        <div className="flex flex-col items-center text-center animate-fade-in-up" style={{width: width, height: height}}>
            <div className="bg-emerald-600 text-white w-full p-6 relative flex items-center justify-center">
                <div className="absolute left-6 cursor-pointer hover:opacity-80 transition-opacity" onClick={onBack}>
                    <ArrowLeftIcon size={32} weight="bold" />
                </div>

                <h2 className="text-2xl font-bold">What is your weekly goal?</h2>
            </div>
            <div className="p-6 space-y-8 text-gray-800 text-start w-full h-full">
                <div>
                    <div className="flex justify-between">
                        <p>TDEE hiện tại của bạn:</p>
                        <p>
                            <span className="font-bold text-emerald-600">{data} </span>
                            (kcal/ngày)
                        </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        *TDEE là tổng năng lượng tiêu hao mỗi ngày.
                    </p>

                    <div>
                        <div className="flex items-center justify-between font-medium text-gray-800 my-4">
                            <span>Mục tiêu giảm cân (kg/tuần)</span>
                            <span className="text-emerald-600 font-bold text-lg">{weightLossGoal} kg</span>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="1.5"
                            step="0.1"
                            value={weightLossGoal}
                            onChange={(e) => setWeightLossGoal(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                            <span>0.1 kg (Chậm)</span>
                            <span>1.5 kg (Cực gắt)</span>
                        </div>
                    </div>

                {/*  Result  */}
                    <div className="pt-6 border-t border-gray-300 mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 font-medium">Cần thâm hụt:</span>
                            <span className="text-lg font-bold text-orange-500">-{dailyDeficit} kcal/ngày</span>
                        </div>

                        <div className={`p-5 rounded-2xl flex flex-col items-center justify-center transition-colors duration-300 ${
                            isDangerouslyLow ? 'bg-red-50 border-2 border-red-200' : 'bg-emerald-50 border-2 border-emerald-100'
                        }`}>
                        <span className={`text-sm font-bold uppercase tracking-wider mb-1 ${
                            isDangerouslyLow ? 'text-red-500' : 'text-emerald-600'
                        }`}>
                            Calo nạp vào mục tiêu
                        </span>
                            <div className={`text-4xl font-extrabold ${
                                isDangerouslyLow ? 'text-red-600' : 'text-emerald-700'
                            }`}>
                                {dailyIntake} <span className="text-lg font-medium">kcal</span>
                            </div>
                        </div>
                    </div>
                {/*  Warning  */}
                    {isDangerouslyLow && (
                        <div className="mt-5 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl animate-pulse">
                            <div className="flex items-start">
                                <svg className="w-6 h-6 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <div className="ml-3">
                                    <h3 className="text-sm font-bold text-red-800">Cảnh báo sức khỏe!</h3>
                                    <p className="text-xs text-red-700 mt-1 leading-relaxed">
                                        Mức nạp dưới <strong>1200 kcal/ngày</strong> có thể làm chậm quá trình trao đổi chất, gây mất cơ, sỏi mật và suy nhược cơ thể.
                                        <br/><br/>
                                        <strong>Khuyến nghị:</strong> Hãy giảm mục tiêu kg/tuần xuống hoặc tăng cường tập luyện (để tăng TDEE) thay vì nhịn ăn quá mức.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
