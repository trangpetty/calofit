'use client'

import {Barbell, BowlFood, CalendarCheck, Drop, Fire, Target, ForkKnife} from "@phosphor-icons/react/ssr";
import {useSession} from "next-auth/react";

export default function ContentDashBoard ({profile}: {profile: any}) {
    const {data: session, status} = useSession();
    const baseGoal = 1800;
    const food = 0;
    const exercise = 0;
    const remaining = baseGoal - food + exercise;

    return (
        <main className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
            {session ?
                (
                    <main>
                        <header className="flex items-center justify-between">
                            {session.user?.image && (
                                <div className="flex items-center gap-4">
                                    <img src={session.user.image} alt="Avatar" className="w-16 h-16 rounded-full"/>
                                    <p className="text-gray-900 text-2xl font-bold">Today</p>
                                </div>
                            )}
                            <div className="flex flex-col text-gray-600">
                                <div className="flex items-center gap-3 text-2xl font-extrabold ">
                                    <div className="p-2 bg-gray-200 rounded-xl">
                                        <Fire size={20} weight="duotone"/>
                                    </div>
                                    <p className="text-2xl  font-extrabold">0</p>
                                </div>
                                <p>Day streak</p>
                            </div>
                        </header>
                        <div className="flex flex-wrap gap-4">
                            <section className="shadow-lg p-5 rounded-lg flex flex-col gap-4" style={{width: "600px"}}>
                                <div>
                                    <p className="text-xl text-gray-900 font-bold">Calories</p>
                                    <p className="text-sm text-gray-400">Remaining = Goal - Food + Exercise</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="relative flex justify-center items-center w-36 h-36">
                                        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90"
                                             viewBox="0 0 100 100">
                                            <circle
                                                className="text-gray-100 stroke-current"
                                                strokeWidth="8"
                                                cx="50"
                                                cy="50"
                                                r="42"
                                                fill="transparent"
                                            />
                                            <circle
                                                className="text-emerald-500 stroke-current transition-all duration-1000 ease-in-out"
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                cx="50"
                                                cy="50"
                                                r="42"
                                                fill="transparent"
                                                strokeDasharray="264"
                                                strokeDashoffset="264"
                                            />
                                        </svg>

                                        <div className="flex flex-col items-center justify-center z-10 text-center">
                                            <span className="text-3xl font-bold text-gray-900 tracking-tight">
                                                {remaining}
                                            </span>
                                            <span className="text-sm font-medium text-gray-500">
                                                Remaining
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center gap-5">

                                        <div className="flex items-center gap-3">
                                            <Target className="w-5 h-5 text-gray-500" strokeWidth={2.5}/>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-medium text-gray-500">Base Goal</span>
                                                <span className="text-base font-bold text-gray-900 leading-tight">
                                                    {baseGoal}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <ForkKnife className="w-5 h-5 text-blue-500" strokeWidth={2.5}/>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-medium text-gray-500">Food</span>
                                                <span className="text-base font-bold text-gray-900 leading-tight">
                                                    {food}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Fire className="w-5 h-5 text-orange-500" strokeWidth={2.5}/>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-medium text-gray-500">Exercise</span>
                                                <span className="text-base font-bold text-gray-900 leading-tight">
                                                    {exercise}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                ) : (
                    <></>
                )}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    className="col-span-1 md:col-span-1 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-100 mb-4">
                        <Fire size={24} weight="duotone"/>
                        <h2 className="font-medium">Mục tiêu Calo</h2>
                    </div>
                    <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-extrabold tracking-tight">
                                {profile?.dailyCaloriesGoal}
                            </span>
                        <span className="text-emerald-200 font-medium">kcal</span>
                    </div>
                    <p className="text-sm text-emerald-100 mt-4 opacity-80">
                        TDEE của bạn: {profile?.tdee} kcal
                    </p>
                </div>

                {/* Macros */}
                <div
                    className="col-span-1 md:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h2 className="text-gray-800 font-bold mb-4">Phân bổ dinh dưỡng (Macros)</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-1">
                                <Barbell size={20} weight="fill"/>
                                <span className="text-sm font-bold">ĐẠM</span>
                            </div>
                            <p className="text-2xl font-extrabold text-gray-900">{profile?.proteinTarget || '--'}<span
                                className="text-sm text-gray-500 font-normal ml-1">g</span></p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                            <div className="flex items-center gap-2 text-amber-600 mb-1">
                                <BowlFood size={20} weight="fill"/>
                                <span className="text-sm font-bold">TINH BỘT</span>
                            </div>
                            <p className="text-2xl font-extrabold text-gray-900">{profile?.carbsTarget || '--'}<span
                                className="text-sm text-gray-500 font-normal ml-1">g</span></p>
                        </div>
                        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                            <div className="flex items-center gap-2 text-rose-500 mb-1">
                                <Drop size={20} weight="fill"/>
                                <span className="text-sm font-bold">CHẤT BÉO</span>
                            </div>
                            <p className="text-2xl font-extrabold text-gray-900">{profile?.fatTarget || '--'}<span
                                className="text-sm text-gray-500 font-normal ml-1">g</span></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- KHỐI 2: DÀNH CHO SCRUM 13 & 14 (Goal Tracker) --- */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Widget: Tiến độ giảm cân */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                                <Target size={24} weight="duotone"/>
                            </div>
                            <h2 className="font-bold text-gray-800 text-lg">Tiến độ mục tiêu</h2>
                        </div>
                        <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">
                                Đang xây dựng...
                            </span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Hiện tại: <strong
                                className="text-gray-900">{profile?.weight} kg</strong></span>
                            <span className="text-gray-500">Mục tiêu: <strong
                                className="text-gray-900">-- kg</strong></span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                            <div className="bg-purple-500 h-3 rounded-full" style={{width: '35%'}}></div>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-2">Đã hoàn thành 35%</p>
                    </div>
                </div>

                <div
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                            <CalendarCheck size={24} weight="duotone"/>
                        </div>
                        <h2 className="font-bold text-gray-800 text-lg">Dự kiến hoàn thành</h2>
                    </div>

                    <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-2xl">
                        <p className="text-3xl font-extrabold text-gray-300">Tháng 12, 2026</p>
                        <p className="text-sm text-gray-400 mt-2">Dựa trên tốc độ 0.5kg/tuần</p>
                    </div>
                </div>
            </section>

        </main>
    );
}