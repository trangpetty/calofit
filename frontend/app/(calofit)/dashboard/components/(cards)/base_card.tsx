import {BaseCardProps} from "@/app/types/dashboard";
import {ButtonGetPremium} from "@/app/ui/button_premium";
import React from "react";

export default function BaseCard ({
                                    icon, title, badge = 'Free', actionText,
                                    onActionClick, children, isLocked = false,
                                    classNameBlur = "", classNameCard =""
                                  }: BaseCardProps) {
    return (
        <div className={`rounded - 2xl p-4 w-full flex flex-col font-sans shadow-lg gap-4 ${classNameCard}`}>
            {/* Header card */}
            <>
                <div className="flex items-center gap-3">
                    {icon}
                    <h3 className="text-gray-900 font-bold text-base">{title}</h3>
                    {badge === 'Free' ? (
                        <span className="bg-[#e0f5e9] text-[#1a5d36] text-[10px] font-bold px-2 py-0.5 rounded-md">Free</span>
                    ) : (
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-md">Premium</span>
                    )}
                </div>
                {actionText && (
                    <button
                        onClick={onActionClick}
                        className="text-emerald-600 text-sm font-semibold float-end hover:text-emerald-500 transition-colors mb-4"
                    >
                        {actionText}
                    </button>
                )}
            </>

            <div className="flex-1 relative">
                {isLocked ? (
                    <>
                        <div className={`blur-[4px] opacity-40 select-none pointer-events-none h-full ${classNameBlur}`}>
                            {children}
                        </div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <ButtonGetPremium />
                        </div>
                    </>
                ) : (
                    children
                )}
            </div>
        </div>
    )
}