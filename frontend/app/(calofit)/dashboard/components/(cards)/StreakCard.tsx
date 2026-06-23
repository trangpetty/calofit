'use client';

import BaseCard from "@/app/(calofit)/dashboard/components/(cards)/base_card";
import {StreakDay} from "@/app/types/dashboard";

export default function StreakCard() {
    const days: StreakDay[] = [
        { label: 'T2', status: 'done' },
        { label: 'T3', status: 'done' },
        { label: 'T4', status: 'done' },
        { label: 'T5', status: 'done' },
        { label: 'T6', status: 'done' },
        { label: 'T7', status: 'current' },
        { label: 'CN', status: 'future' },
    ];

    return (
        <BaseCard title="Streak 7 days" badge="Premium">
            <div className="w-full flex flex-col justify-between h-full mt-2 gap-4">

                <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                    {days.map((day) => {
                        let boxClasses = "flex-1 aspect-square max-h-[46px] flex items-center justify-center rounded-xl text-sm font-bold transition-all ";

                        if (day.status === 'done') {
                            boxClasses += "bg-emerald-500 text-white shadow-md shadow-emerald-900/20";
                        } else if (day.status === 'current') {
                            boxClasses += "bg-emerald-500/10 text-emerald-500 border-2 border-emerald-500";
                        } else {
                            boxClasses += "bg-transparent text-gray-500 border-2 border-gray-700";
                        }

                        return (
                            <div key={day.label} className={boxClasses}>
                                {day.label}
                            </div>
                        );
                    })}
                </div>

                <p className="text-xs font-semibold text-gray-400">
                    Achieve calorie goals for 12 consecutive days.
                </p>

            </div>
        </BaseCard>
    );
}