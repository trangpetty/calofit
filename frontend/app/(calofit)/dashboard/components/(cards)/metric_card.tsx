'use client'

import {MetricCardProps} from "@/app/types/dashboard";

export default function MetricCard ({
                                        title, icon, mainValue, subValue,
                                        progressPercentage, footerText,
                                        themeColor = 'green', footerColor
                                    }: MetricCardProps) {
    const colorStyles = {
        green: { text: 'text-emerald-500', bg: 'bg-emerald-500' },
        blue: { text: 'text-blue-500', bg: 'bg-blue-500' },
        orange: { text: 'text-orange-500', bg: 'bg-orange-500' },
        cyan: { text: 'text-cyan-500', bg: 'bg-cyan-500' },
        purple: { text: 'text-purple-500', bg: 'bg-purple-500' },
    }

    const activeColor = colorStyles[themeColor];

    return (
        <div className="rounded-2xl p-4 w-full h-full flex flex-col font-sans border gap-2 shadow-lg">

            {/* Header: Icon + Title */}
            <div className={`flex items-center gap-1.5 ${activeColor.text}`}>
                {icon}
                <span className="font-semibold text-sm leading-tight">{title}</span>
            </div>

            {/* Main figures */}
            <div className="flex flex-col flex-1 justify-start items-start">
                <span className="text-3xl font-bold text-gray-900 tracking-tight leading-none">
                    {mainValue}
                </span>
                <span className="text-gray-400 text-xs font-medium">
                    {subValue}
                </span>
            </div>

            {/* Progress bar */}
            { progressPercentage ? (
                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ease-out ${activeColor.bg}`}
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                </div>
            ) : (
                <></>
            )}

            {/* Footer */}
            {footerText ? (
                <div className={`text-xs font-semibold ${footerColor || activeColor.text}`}>
                    {footerText}
                </div>
            ) : (
                <></>
            )}

        </div>
    )
}