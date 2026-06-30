'use client';

import React, {useEffect, useState} from 'react';
import {
    Plus,
    CalendarIcon,
    FireIcon, BarbellIcon,
    TargetIcon,
    Fire
} from "@phosphor-icons/react";
import BaseCard from "@/app/(calofit)/dashboard/components/(cards)/base_card";
import MetricCard from "@/app/(calofit)/dashboard/components/(cards)/metric_card";
import {ChartConfig, ChartContainer} from "@/components/ui/chart";
import {Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, XAxis, YAxis} from "recharts";
import WeightLogModal from "@/app/(calofit)/progress/components/WeightLogModal";
import {GoalProgressResult} from "@/app/types/progress";

interface ContentProgressProps {
    profile?: GoalProgressResult | undefined
}

export default function ContentProgress ({profile}: ContentProgressProps) {
    const chartData = [
        { day: "Mon", calo: 1220 },
        { day: "Tue", calo: 1500 },
        { day: "Wed", calo: 1423 },
        { day: "Thu", calo: 1400 },
        { day: "Fri", calo: 1340 },
        { day: "Sat", calo: 2222 },
        { day: "Sun", calo: 0 },
    ];

    const chartConfig = {
        calo: {
            label: "calo",
            color: "#10b981",
        }
    } satisfies ChartConfig

    const badges = [
        { emoji: "🔥", text: "7 days", isUnlocked: true },
        { emoji: "💪", text: "First gym", isUnlocked: true },
        { emoji: "⭐", text: "30 days", isUnlocked: false },
        { emoji: "🏆", text: "Get goal", isUnlocked: false },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    useEffect(() => {
        const isMissingData = profile?.targetWeight == null || !profile?.currentWeight;
        if (isMissingData) {
            setIsModalOpen(true);
        }
    }, [profile]);

    const handleRefreshData = () => {
        console.log("refresh");
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 min-h-screen text-gray-900 font-sans flex flex-col gap-6">

            <button onClick={handleOpenModal}>
                + Weight log
            </button>
            <WeightLogModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleRefreshData}
                profile={profile}
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Current weight" icon={<BarbellIcon size={14} weight="bold" />} mainValue="60" subValue="kg · Starting weight: 64kg" footerText="Lose 4kg" themeColor="green" />
                <MetricCard title="Streak" icon={<FireIcon size={14} weight="bold" />} mainValue="12" subValue="consecutive days" footerText="Personal record" themeColor="orange" />
                <MetricCard title="Complete" icon={<TargetIcon size={14} weight="bold" />} mainValue="35%" subValue="move towards the goal" progressPercentage={35} themeColor="purple" />
                <MetricCard title="Expect" icon={<CalendarIcon size={14} weight="bold" />} mainValue="December" subValue="" footerText="if maintaining 0.5kg/week" themeColor="cyan" />
            </div>

            {/* 2. Main Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                <div className="flex flex-col gap-4 lg:col-span-3">
                    {/* Chart */}
                    <BaseCard title="Calories for the last 7 days">
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="day"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={10}
                                    fontSize={12}
                                    fill="#9ca3af"
                                    ticks={[0, 1000, 1500, 1800, 2200]}
                                    domain={[0, 'dataMax + 200']}
                                />
                                <ReferenceLine y={1500} stroke="#f97316" strokeDasharray="3 3" strokeWidth={1} />
                                <ReferenceLine y={1800} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={1} />
                                <Bar dataKey="calo" radius={4}>
                                    <LabelList
                                        dataKey="calo"
                                        position="top"
                                        offset={8}
                                        className="fill-gray-900 font-semibold text-xs"
                                    />
                                    {chartData.map((entry, index) => {
                                        let fillColor = "var(--color-calo)";

                                        if (entry.calo > 1800) {
                                            fillColor = "#ef4444";
                                        } else if (entry.calo >= 1500) {
                                            fillColor = "#f97316";
                                        }

                                        return <Cell key={`cell-${index}`} fill={fillColor} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                        <div className="flex items-center justify-center gap-5 mt-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-[3px] bg-emerald-500"></div>
                                <span className="text-sm text-gray-900 font-medium">Safe</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-[3px] bg-orange-400"></div>
                                <span className="text-sm text-gray-900 font-medium">Almost equal</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-[3px] bg-red-400"></div>
                                <span className="text-sm text-gray-900 font-medium">Over</span>
                            </div>

                        </div>
                    </BaseCard>

                    {/* 30-day trend */}
                    <BaseCard title="30-day weight trend" badge="Premium" isLocked={true} classNameBlur="flex flex-col gap-3 col-span-3">
                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                    </BaseCard>

                </div>
                <div className="flex flex-col gap-4 lg:col-span-2">
                    {/* Streak */}
                    <BaseCard title="Streak 7 days" badge="Premium" isLocked={true}>
                        <div className="flex gap-2 items-center col-span-2">
                            {chartData.map((entry, index) => {
                                let bgClass = "bg-emerald-400";

                                if (entry.calo > 1800) {
                                    bgClass = "bg-red-400";
                                } else if (entry.calo >= 1500) {
                                    bgClass = "bg-orange-400";
                                } else if (entry.calo === 0) {
                                    bgClass = "bg-gray-400"
                                }
                                return (
                                        <p className={`p-3 rounded-lg text-white text-sm ${bgClass} font-bold`} key={`day-${index}`}>
                                            {entry.day}
                                        </p>
                                )
                            })}
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Achieve calorie goals for 12 consecutive days.</p>
                    </BaseCard>

                    {/* Badges */}
                    <BaseCard title="Badges">
                        <div className="flex items-center justify-between mt-4 px-2">
                            {badges.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <div
                                        className={`text-3xl transition-all duration-300 ${
                                            item.isUnlocked
                                                ? "drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] hover:scale-110 cursor-pointer" // Sáng màu, có đổ bóng nhẹ
                                                : "grayscale opacity-30 brightness-50" 
                                        }`}
                                    >
                                        {item.emoji}
                                    </div>
                                    <p
                                        className={`text-xs font-semibold ${
                                            item.isUnlocked ? "text-gray-600" : "text-gray-300"
                                        }`}
                                    >
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </BaseCard>
                </div>

            </div>
        </div>
    );
}
