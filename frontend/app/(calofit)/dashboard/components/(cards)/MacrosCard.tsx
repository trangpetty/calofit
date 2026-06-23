'use client'

import {Sparkle} from "@phosphor-icons/react/ssr";
import {MacroData, MacrosCardProps} from "@/app/types/dashboard";
import BaseCard from "@/app/(calofit)/dashboard/components/(cards)/base_card";
import {ButtonGetPremium} from "@/app/ui/button_premium";

export default function MacrosCard ({
                                        calo = { current: 1240, max: 1800 },
                                        protein = { current: 68, max: 154 },
                                        carbs = { current: 142, max: 206 },
                                        fat = { current: 34, max: 69 }
                                    }: MacrosCardProps) {
    const MacroRow = ({ label, color, bgClass, data }: { label: string, color: string, bgClass: string, textClass: string, data: MacroData }) => {
        const percent = Math.min((data.current / data.max) * 100, 100);
        return (
            <div className="flex items-center gap-1 text-sm text-gray-500">
                <div className="flex items-center gap-1.5 w-18">
                    <div className={`w-2 h-2 rounded-full ${bgClass}`}></div>
                    <span>{label}</span>
                </div>
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all`} style={{ width: `${percent}%`, backgroundColor: color }}></div>
                </div>
                <div className="w-20 text-right ">
                    <span className="font-bold">{data.current}g</span>
                    <span className="text-xs"> /{data.max}g</span>
                </div>
            </div>
        );
    };

    return (
        <BaseCard title="Macros today" badge="Free" actionText="Details">
            <div className="w-full flex lg:flex-nowrap flex-wrap items-center justify-between gap-6">
                {/* The ring of macros */}
                <div className="flex gap-4 items-center justify-center w-full md:justify-start md:w-auto">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-[6px] border-emerald-500" style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 ${Math.min((calo.current / calo.max) * 100, 100)}%)` }}></div>
                        <div className="text-center text-gray-900">
                            <p className="font-bold lg:text-xl text-sm leading-none">{calo?.current}</p>
                            <p className="text-gray-500 text-[10px]">kcal</p>
                        </div>
                    </div>
                </div>

                {/*  3 macros progress  */}
                <div className="flex-1 flex flex-col gap-4">
                    <MacroRow label="Protein" color="#3b82f6" bgClass="bg-blue-500" textClass="text-blue-500" data={protein} />
                    <MacroRow label="Carb" color="#f97316" bgClass="bg-orange-500" textClass="text-orange-500" data={carbs} />
                    <MacroRow label="Fat" color="#a855f7" bgClass="bg-purple-500" textClass="text-purple-500" data={fat} />
                </div>
            </div>

            {/* Link Premium */}
            <div className="mt-5 py-2 px-4 cursor-pointer border border-dashed rounded-lg border-gray-700 flex justify-between items-center">
                <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-semibold">
                    <Sparkle size={20} weight="fill" />
                    Analysis detailed nutritional
                </button>
                <ButtonGetPremium />
            </div>
        </BaseCard>
    )
}