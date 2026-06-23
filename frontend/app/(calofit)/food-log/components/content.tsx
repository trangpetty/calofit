'use client';

import React from 'react';
import {Scan, Plus, Egg, Bread, Drop, FishSimple, BowlFood, OnigiriIcon} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Import các component dùng chung (Nhớ trỏ đúng đường dẫn thư mục của bạn)
import MetricCard from "@/app/(calofit)/dashboard/components/(cards)/metric_card";
import BaseCard from "@/app/(calofit)/dashboard/components/(cards)/base_card";
import {ButtonGetPremium} from "@/app/ui/button_premium";

export default function ContentFoodLog({ profile }: { profile: any }) {
    return (
        <div className="w-full max-w-5xl mx-auto p-4 min-h-screen text-gray-900 font-sans flex flex-col gap-6">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Ate" mainValue="1.240" subValue="/1.800 kcal" progressPercentage={68} footerText="" themeColor="green" icon={undefined} />
                <MetricCard title="Protein" mainValue="68g" subValue="/154g" progressPercentage={44} footerText="" themeColor="blue" icon={undefined} />
                <MetricCard title="Carb" mainValue="142g" subValue="/206g" progressPercentage={68} footerText="" themeColor="orange" icon={undefined} />
                <MetricCard title="Fat" mainValue="34g" subValue="/69g" progressPercentage={49} footerText="" themeColor="cyan" icon={undefined} />
            </div>

            {/* 2. Search bar */}
            <div className="flex items-center gap-3">
                <Input
                    placeholder="Find a dish... (phở, cơm tấm, bánh mì...)"
                    className="flex-1  border-emerald-600 rounded-xl text-gray-900 h-12 focus-visible:ring-emerald-500"
                />
                <Button variant="outline" size="icon" className="h-12 w-12 border-emerald-600 rounded-xl shrink-0 bg-transparent text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600">
                    <Scan size={24} />
                </Button>
                <Button className="h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl px-6 shrink-0 flex items-center gap-2">
                    <Plus size={18} weight="bold" /> Thêm
                </Button>
            </div>

            {/* 3. 2 Main Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                {/* List meals */}
                <div className="flex flex-col gap-4">
                    <BaseCard title="Bữa sáng" actionText="+ Thêm">
                        <div className="flex justify-between items-center mb-4 mt-[-8px]">
                            <span className="text-gray-400 text-sm">420 kcal</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <FoodItem icon={<Egg size={20} weight="fill" />} iconBg="bg-[#fef3c7]" iconColor="text-yellow-600" name="Trứng luộc" desc="2 quả · 100g" calo={156}/>
                            <FoodItem icon={<Bread size={20} weight="fill" />} iconBg="bg-orange-100" iconColor="text-orange-600" name="Bánh mì đen" desc="2 lát · 60g" calo={148} />
                            <FoodItem icon={<Drop size={20} weight="fill" />} iconBg="bg-blue-100" iconColor="text-blue-500" name="Sữa tươi" desc="200ml" calo={116} />
                        </div>
                    </BaseCard>

                    <BaseCard title="Bữa trưa" actionText="+ Thêm">
                        <div className="flex justify-between items-center mb-4 mt-[-8px]">
                            <span className="text-gray-400 text-sm">820 kcal</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <FoodItem icon={<div className="w-5 h-5 rounded-sm bg-emerald-200"><OnigiriIcon size={20} weight="bold" /></div>} iconBg="bg-emerald-100" iconColor="" name="Cơm gạo lứt" desc="180g" calo={234} />
                            <FoodItem icon={<div className="w-5 h-5 rounded-full bg-pink-300"></div>} iconBg="bg-pink-100" iconColor="" name="Ức gà luộc" desc="150g" calo={247} />
                        </div>
                    </BaseCard>

                    <button className="w-full text-left p-4 border-2 border-dashed border-emerald-600  rounded-2xl text-emerald-600 hover:border-gray-500 hover:bg-emerald-100 transition-colors flex items-center justify-between">
                        <span className="flex items-center gap-2"><Plus size={18} /> Thêm bữa tối...</span>
                    </button>
                </div>

                {/* Suggestion and AI Plan */}
                <div className="flex flex-col gap-4">

                    {/* Suggestion Cards */}
                    <BaseCard title="Gợi ý thêm vào">
                        <div className="flex flex-col gap-4 mt-2">
                            <SuggestionItem icon={<FishSimple size={20} weight="fill" />} iconBg="bg-emerald-100" iconColor="text-emerald-600" name="Cá hồi áp chảo" desc="100g · 208 kcal · P: 20g" />
                            <SuggestionItem icon={<BowlFood size={20} weight="fill" />} iconBg="bg-yellow-100" iconColor="text-yellow-600" name="Salad rau xanh" desc="100g · 34 kcal · F: 3g" />
                            <SuggestionItem icon={<Egg size={20} weight="fill" />} iconBg="bg-purple-100" iconColor="text-purple-600" name="Greek yogurt" desc="150g · 100 kcal · P: 17g" />
                        </div>
                    </BaseCard>

                    {/* AI Meal Plan */}
                    <BaseCard title="AI meal plan this week" badge="Premium">
                        <div className="relative mt-2 h-[120px] rounded-xl overflow-hidden flex flex-col justify-center">
                            <div className="blur-[4px] opacity-40 select-none flex flex-col gap-2">
                                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                                <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                            </div>

                            <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <ButtonGetPremium />
                            </div>
                        </div>
                    </BaseCard>

                </div>
            </div>
        </div>
    );
}

// --- COMPONENT PHỤ TRỢ (Để code chính sạch sẽ hơn) ---

function FoodItem({ icon, iconBg, iconColor, name, desc, calo }: { icon: any, iconBg: string, iconColor: string, name: string, desc: string, calo: number }) {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-base">{name}</span>
                    <span className="text-gray-500 text-xs">{desc}</span>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{calo}</span>
                <span className="text-gray-500 text-xs">kcal</span>
            </div>
        </div>
    );
}

function SuggestionItem({ icon, iconBg, iconColor, name, desc }: { icon: any, iconBg: string, iconColor: string, name: string, desc: string }) {
    return (
        <div className="flex items-center justify-between group cursor-pointer hover:bg-emerald-100 p-2 -mx-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm">{name}</span>
                    <span className="text-gray-400 text-xs">{desc}</span>
                </div>
            </div>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-transparent border-gray-600 text-gray-400 hover:text-emerald-500 hover:border-emerald-500">
                <Plus size={14} weight="bold" />
            </Button>
        </div>
    );
}