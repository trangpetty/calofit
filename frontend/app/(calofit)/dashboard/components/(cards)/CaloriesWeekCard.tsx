'use client';

import BaseCard from "@/app/(calofit)/dashboard/components/(cards)/base_card";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"
import {ChartConfig, ChartContainer} from "@/components/ui/chart";
import {ButtonGetPremium} from "@/app/ui/button_premium";


interface CaloWeekCardProps {
    blur?: boolean;
}

export default function CaloWeekCard({blur = true}: CaloWeekCardProps) {
    const chartData = [
        { day: "Mon", desktop: 186 },
        { day: "Tue", desktop: 305 },
        { day: "Wed", desktop: 237 },
        { day: "Thu", desktop: 73 },
        { day: "Fri", desktop: 209 },
        { day: "Sat", desktop: 214 },
        { day: "Sun", desktop: 214 },
    ];

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#2563eb",
        }
    } satisfies ChartConfig

    return (
        <BaseCard title="Calo tuần này" badge="Premium">
            <div className="relative flex flex-col h-full justify-between">

                {/* Text day in week */}
                <div className={`flex justify-between text-gray-400 text-xs font-medium px-2 mb-4 transition-all duration-300 
                                ${blur ? 'blur-[5px] opacity-40 pointer-events-none select-none' : ''}
                                `}>
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
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </div>

                {blur && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <ButtonGetPremium />
                    </div>
                )}
            </div>
        </BaseCard>
    );
}