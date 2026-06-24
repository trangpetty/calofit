'use client';

import React from 'react';
import {Sparkle, Plus, CheckCircle, Circle, Barbell, PersonSimpleRun, Crown, ArrowDown} from "@phosphor-icons/react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import BaseCard from "@/app/(calofit)/dashboard/components/(cards)/base_card";
import {ButtonGetPremium} from "@/app/ui/button_premium";

interface ContentWorkoutProps {
    profile?: any
}

export default function ContentWorkout({profile}: ContentWorkoutProps) {
    return (
        <div className="w-full max-w-7xl mx-auto mt-6 p-4 min-h-screen text-white font-sans flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                <div className="flex flex-col gap-4 overflow-x-auto pb-2 scrollbar-hide w-full">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="text-xl text-gray-900 font-bold">This week — Push/Pull/Legs</h1>
                        <div className="flex items-center gap-2">
                            <Button
                                className="border-purple-400 bg-transparent hover:bg-purple-200 text-purple-700 font-semibold rounded-full px-4 h-9 flex items-center gap-2">
                                <Sparkle size={16} weight="fill"/> AI create
                            </Button>
                            <Button variant="outline"
                                    className="bg-transparent border-emerald-600 text-emerald-600 hover:bg-gray-800 hover:text-white rounded-full px-4 h-9">
                                + Adjust
                            </Button>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
                        <div
                            className="min-w-[180px] flex-1 border border-emerald-500 rounded-xl p-4 cursor-pointer text-emerald-500">
                            <p className="font-bold mb-1">Mon — Push</p>
                            <p className="text-gray-400 text-sm mb-3">6 exercises · Done</p>
                            <div className="w-full h-1 bg-emerald-500 rounded-full"></div>
                        </div>

                        <div
                            className="min-w-[180px] flex-1 bg-emerald-50 border border-emerald-500 rounded-xl p-4 cursor-pointer">
                            <p className="text-[#1a5d36] font-bold mb-1">Tues — Pull</p>
                            <p className="text-emerald-700 text-sm mb-3">3/6 · Working</p>
                            <div className="w-4/5 h-1 bg-emerald-600 rounded-full"></div>
                        </div>

                        <div
                            className="min-w-[180px] flex-1 border border-gray-500 rounded-xl p-4 cursor-pointer opacity-70">
                            <p className="text-gray-500 font-bold mb-1">Wed — Legs</p>
                            <p className="text-gray-400 text-sm mb-3">5 exercises · Next</p>
                            <div className="w-full h-1 bg-gray-700 rounded-full"></div>
                        </div>
                    </div>

                </div>
                <BaseCard title="Today — Pull day" actionText="3/6">
                    <div className="flex flex-col gap-4 mt-1">
                        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{width: '50%'}}></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <WorkoutTask order={1} name="Deadlift · 4×6 · 80kg" muscle="Lưng" status="done"/>
                            <WorkoutTask order={2} name="Pull-up · 3×8 · BW" muscle="Lưng" status="done"/>
                            <WorkoutTask order={3} name="Barbell row · 4×8" muscle="Lưng" status="done"/>
                            <WorkoutTask order={4} name="Seated row · tiếp theo" muscle="" status="next"/>
                        </div>
                    </div>
                </BaseCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                <div className="flex flex-col gap-6 relative">

                    <BaseCard title="Exercise library" badge="Free">
                        <div className="flex flex-col gap-4 mt-2">
                            <Input
                                placeholder="Find exercise..."
                                className="bg-transparent border-emerald-700 text-gray-900 rounded-xl h-11 focus-visible:ring-emerald-500"
                            />

                            <div className="flex flex-col gap-1 text-gray-900">
                                <ExerciseItem icon={<Barbell size={20} weight="fill"/>} iconBg="bg-blue-100"
                                              iconColor="text-blue-600" name="Bench press" desc="Ngực · Barbell"/>
                                <div className="h-[1px] bg-gray-800 my-1"></div>
                                <ExerciseItem icon={<Barbell size={20} weight="fill"/>} iconBg="bg-purple-100"
                                              iconColor="text-purple-600" name="Squat" desc="Chân · Barbell"/>
                                <div className="h-[1px] bg-gray-800 my-1"></div>
                                <ExerciseItem icon={<PersonSimpleRun size={20} weight="fill"/>} iconBg="bg-emerald-100"
                                              iconColor="text-emerald-600" name="Cardio HIIT 20p"
                                              desc="Cardio · Toàn thân"/>
                            </div>
                        </div>
                    </BaseCard>
                </div>

                <div className="flex flex-col gap-6">
                    <BaseCard title="AI tạo lịch tập" badge="Premium">
                        <div
                            className="relative mt-2 h-[140px] rounded-xl overflow-hidden flex flex-col justify-center">
                            <div className="blur-[5px] opacity-40 select-none flex flex-col gap-3">
                                <div className="h-4 bg-gray-500 rounded w-full"></div>
                                <div className="h-4 bg-gray-500 rounded w-[85%]"></div>
                                <div className="h-4 bg-gray-500 rounded w-[60%]"></div>
                            </div>

                            <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <ButtonGetPremium/>
                            </div>
                        </div>
                    </BaseCard>

                </div>
            </div>
        </div>
    );
}


function ExerciseItem({icon, iconBg, iconColor, name, desc}: {
    icon: any,
    iconBg: string,
    iconColor: string,
    name: string,
    desc: string
}) {
    return (
        <div
            className="flex items-center justify-between py-2 group cursor-pointer hover:bg-gray-800/30 px-2 -mx-2 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm">{name}</span>
                    <span className="text-gray-500 text-xs">{desc}</span>
                </div>
            </div>
            <Button variant="outline" size="icon"
                    className="w-8 h-8 rounded-full bg-transparent border-gray-600 text-gray-500 hover:text-emerald-500 hover:border-emerald-500">
                <Plus size={14} weight="bold"/>
            </Button>
        </div>
    );
}

function WorkoutTask({order, name, muscle, status}: {
    order: number,
    name: string,
    muscle: string,
    status: 'done' | 'next'
}) {
    const isDone = status === 'done';

    return (
        <div className={`flex items-center justify-between p-3 rounded-xl ${
            isDone ? 'bg-transparent border border-gray-800' : 'bg-[#e0f5e9] text-[#1a5d36] border border-emerald-500'
        }`}>
            <div className="flex items-center gap-3">
                {isDone ? (
                    <CheckCircle size={22} weight="fill" className="text-emerald-500"/>
                ) : (
                    <Circle size={22} weight="regular" className="text-emerald-600"/>
                )}

                <div className="flex items-center gap-2 text-sm font-semibold">
                    <span
                        className={`font-bold w-6 h-6 flex items-center justify-center rounded text-xs ${isDone ? 'text-emerald-600 bg-emerald-100' : 'text-gray-500'}`}>
                        {order}
                    </span>
                    <span className={isDone ? 'text-white' : ''}>{name}</span>
                </div>
            </div>

            {muscle && (
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                    isDone ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-700'
                }`}>
                    {muscle}
                </span>
            )}
        </div>
    );
}
