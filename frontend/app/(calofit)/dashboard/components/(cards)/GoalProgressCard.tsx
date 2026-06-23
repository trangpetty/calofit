'use client';

import BaseCard from "@/app/(calofit)/dashboard/components/(cards)/base_card";
import {GoalProgressProps} from "@/app/types/dashboard";

export default function GoalProgressCard({
                                             currentWeight = 60,
                                             targetWeight = null,
                                             progressPercent = 35
                                         }: GoalProgressProps) {
    return (
        <BaseCard title="Target progress" actionText="Building...">
            <div className="w-full flex flex-col gap-3 mt-2">

                {/* Figure for weight */}
                <div className="flex items-center justify-between text-sm font-bold text-gray-600">
                    <p>Hiện tại: <span>{currentWeight} kg</span></p>
                    <p>Mục tiêu: <span>{targetWeight ? `${targetWeight} kg` : '— kg'}</span></p>
                </div>

                {/* Progressbar */}
                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>

                {/* % */}
                <p className="text-xs font-semibold text-gray-500">
                    Completed {progressPercent}%
                </p>

            </div>
        </BaseCard>
    );
}