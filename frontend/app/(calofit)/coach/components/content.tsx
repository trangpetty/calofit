'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {BowlFood, Barbell, ChartLineUp, UserCheckIcon} from "@phosphor-icons/react";
import BaseCard from "@/app/(calofit)/dashboard/components/(cards)/base_card";
import {Sparkle} from "@phosphor-icons/react/ssr";

interface ContentCoachProps {
    profile?: any
}

export default function ContentCoach ({profile}: ContentCoachProps) {

    return (
        <div className="w-full max-w-7xl mx-auto p-4 min-h-screen text-gray-900 font-sans flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="h-full">
                    {/* AI Nutritionist */}
                    <BaseCard title="AI Nutritionist" badge="Premium" icon={<Sparkle size={16} weight="fill" className="text-purple-600"/>} classNameCard="h-full">
                        <div className="flex flex-col gap-4 mt-2 h-full">
                            <div className="flex flex-col gap-4 flex-1">
                                <div className="bg-emerald-100 text-emerald-600 rounded-2xl rounded-tl-sm p-4 w-[90%] text-sm leading-relaxed shadow-sm">
                                    <span className="font-bold">Calofit AI: </span>
                                    Hôm nay bạn còn thiếu 52g protein. Bữa tối nên ưu tiên cá hồi hoặc ức gà để đạt macro target nhé.
                                </div>

                                <div className="bg-gray-300 text-gray-900 rounded-2xl rounded-tr-sm p-4 w-[85%] self-end text-sm leading-relaxed shadow-sm">
                                    Tôi có thể ăn phở gà tối nay không?
                                </div>

                                <div className="bg-emerald-100 text-emerald-600 rounded-2xl rounded-tl-sm p-4 w-[90%] text-sm leading-relaxed shadow-sm">
                                    <span className="font-bold">Calofit AI: </span>
                                    Phở gà 1 tô lớn (~450 kcal, 35g protein) rất phù hợp! Chọn bỏ bánh quẩy và thêm 1 quả trứng để tăng protein nhé.
                                </div>
                            </div>

                            <div className="flex gap-3 mt-2">
                                <Input
                                    placeholder="Ask about nutrition..."
                                    className="bg-transparent border-gray-700 text-gray-900 rounded-xl h-12 focus-visible:ring-emerald-500 flex-1"
                                />
                                <Button className="h-12 bg-gray-500 hover:bg-gray-700 text-white border border-gray-700 rounded-xl px-6 font-semibold">
                                    Send
                                </Button>
                            </div>

                        </div>
                    </BaseCard>

                </div>
                <div className="flex flex-col gap-4">
                    {/* Personal trainer */}
                    <BaseCard title="Personal trainer" badge="Premium" icon={<UserCheckIcon size={16} weight="fill" className="text-emerald-600"/>}>
                        <div className="mt-2 rounded-2xl p-4 flex items-center justify-between bg-gray-200">

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-200 text-emerald-600 flex items-center justify-center font-bold text-lg">
                                    HV
                                </div>
                                <div>
                                    <h4 className="text-gray-900 font-bold text-base leading-tight">No PT yet</h4>
                                    <p className="text-gray-500 text-sm mt-0.5">Find a PT that suits your goals.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="rounded-full border-gray-600 bg-transparent text-gray-500 hover:bg-gray-800 hover:text-white px-4">
                                    View
                                </Button>
                                <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-5">
                                    Find a PT
                                </Button>
                            </div>

                        </div>
                    </BaseCard>

                    {/* Quick Actions */}
                    <BaseCard title="Quick actions" badge="Premium">
                        <div className="flex flex-col gap-3 mt-2">

                            <button className="flex items-center gap-3 w-full bg-[#e0f5e9] hover:bg-[#c6f0d8] text-[#1a5d36] p-4 rounded-xl transition-colors font-semibold text-sm">
                                <BowlFood size={20} weight="fill" /> {"Suggestion for today's meals"}
                            </button>

                            <button className="flex items-center gap-3 w-full bg-[#e0f5e9] hover:bg-[#c6f0d8] text-[#1a5d36] p-4 rounded-xl transition-colors font-semibold text-sm">
                                <Barbell size={20} weight="fill" /> {"Create this week's workout schedule."}
                            </button>

                            <button className="flex items-center gap-3 w-full bg-[#f3e8ff] hover:bg-[#e9d5ff] text-[#6b21a8] p-4 rounded-xl transition-colors font-semibold text-sm">
                                <ChartLineUp size={20} weight="fill" /> {"Analysis of this month's progress"}
                            </button>

                        </div>
                    </BaseCard>
                </div>

            </div>
        </div>
    );
}
