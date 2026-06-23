'use client'

import {Drop, Fire, MinusIcon, PersonSimpleRunIcon  } from "@phosphor-icons/react/ssr";
import {useSession} from "next-auth/react";
import {SparkleIcon} from "@phosphor-icons/react";
import MetricCard from "@/app/(calofit)/dashboard/components/(cards)/metric_card";
import MacrosCard from "@/app/(calofit)/dashboard/components/(cards)/MacrosCard";
import CaloriesWeekCard from "@/app/(calofit)/dashboard/components/(cards)/CaloriesWeekCard";
import { Button } from "@/components/ui/button";

export default function ContentDashBoard ({profile}: {profile: any}) {
    const {data: session, status} = useSession();

    const metricsData = [
        {
            id: 1,
            title: "Calo vào",
            icon: <Fire size={18} weight="fill" />,
            mainValue: "1.240",
            subValue: "/ 1.800 kcal",
            progressPercentage: 68,
            footerText: "Còn 560 kcal",
            themeColor: "green" as const,
        },
        {
            id: 2,
            title: "Burned",
            icon: <PersonSimpleRunIcon size={18} weight="fill" />,
            mainValue: "430",
            subValue: "kcal workout",
            progressPercentage: 40,
            footerText: "+12% vs last week",
            themeColor: "blue" as const,
            footerColor: "text-blue-500"
        },
        {
            id: 3,
            title: "Deficit",
            icon: <MinusIcon size={18} weight="bold" />,
            mainValue: "-990",
            subValue: "kcal",
            progressPercentage: 80,
            footerText: "Pretty much",
            themeColor: "orange" as const,
        },
        {
            id: 4,
            title: "Water",
            icon: <Drop size={18} weight="fill" />,
            mainValue: (
                <span>1.2<span className="text-xl">L</span></span>
            ),
            subValue: "/ 2.5L",
            progressPercentage: 48,
            footerText: "1.3L Remaining",
            themeColor: "cyan" as const,
        }
    ];
    return (
        <main className="max-w-5xl mx-auto px-6 mt-8 space-y-6">
            {session ?
                (
                    <main>
                        {/* introduce of AI */}
                        <div className="bg-violet-200 lg:p-3 p-3 lg:my-4 my-2 rounded-lg flex items-center justify-between">
                            <div className="flex items-center">
                                <SparkleIcon size={24} weight="bold" className="text-violet-600"/>
                                <p className="text-gray-900 lg:text-base text-sm mx-3">
                                    AI coach: còn thiếu 52g protein — bữa tối nên ưu tiên ức gà hoặc cá hồi
                                    <button className="bg-purple-300 text-purple-600 font-semibold rounded-lg py-0.5 px-2 ml-2 cursor-pointer">
                                        Premium
                                    </button>
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl text-emerald-600 py-1 px-3 text-sm md:text-xs">
                                Try it free for 7 days.
                            </div>
                        </div>

                        {/* List calorie + workout + deficit + water */}
                        <div className="w-full grid lg:grid-cols-4 grid-cols-2 gap-4 my-4">
                            {metricsData.map((metric) => (
                                <MetricCard
                                    key={metric.id}
                                    title={metric.title}
                                    icon={metric.icon}
                                    mainValue={metric.mainValue}
                                    subValue={metric.subValue}
                                    progressPercentage={metric.progressPercentage}
                                    footerText={metric.footerText}
                                    themeColor={metric.themeColor}
                                    footerColor={metric.footerColor}
                                />
                            ))}
                        </div>

                        {/* Macros */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <MacrosCard />
                            <CaloriesWeekCard />
                        </div>

                        {/*  With PT  */}
                        <div className="w-full border-2 border-emerald-600 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm mt-4">

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-[#e0f2fe] text-blue-600 flex items-center justify-center font-bold text-lg">
                                    HV
                                </div>

                                <div>
                                    <h3 className="text-gray-900 font-bold text-base leading-tight">
                                        Your coach
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">
                                        No personal trainer yet — find a personal trainer that suits your goals.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    className="flex-1 md:flex-none rounded-full border-emerald-600 text-gray-900 bg-transparent hover:bg-emerald-700 hover:text-white"
                                >
                                    Find out
                                </Button>

                                <Button
                                    className="flex-1 md:flex-none rounded-full bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                                >
                                    Find PT
                                </Button>
                            </div>

                        </div>
                    </main>
                ) : (
                    <></>
                )}
        </main>
    );
}