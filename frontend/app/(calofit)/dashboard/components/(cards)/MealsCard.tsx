'use client';

import BaseCard from "@/app/(calofit)/dashboard/components/(cards)/base_card";
import { Sun, SunDim } from "@phosphor-icons/react";
import {Meal} from "@/app/types/dashboard";

export default function MealsCard({ meals }: { meals?: Meal[] }) {
    const defaultMeals: Meal[] = [
        { id: '1', type: 'breakfast', name: 'Bữa sáng', foods: 'Trứng, bánh mì', calo: 420 },
        { id: '2', type: 'lunch', name: 'Bữa trưa', foods: 'Cơm, ức gà', calo: 820 }
    ];

    const displayMeals = meals || defaultMeals;

    return (
        <BaseCard title="Today's meals" badge="Free" actionText="+ Add">
            <div className="flex flex-col gap-3 w-full">
                {displayMeals.map((meal) => (
                    <div key={meal.id} className="flex items-center justify-between border-b border-b-gray-600 p-2">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${meal.type === 'breakfast' ? 'bg-[#fef3c7] text-yellow-600' : 'bg-[#e0f2fe] text-blue-500'}`}>
                                {meal.type === 'breakfast' ? <Sun size={20} weight="fill"/> : <SunDim size={20} weight="fill"/>}
                            </div>
                            <div>
                                <p className="text-gray-900 font-bold text-sm">{meal.name}</p>
                                <p className="text-gray-500 text-xs">{meal.foods}</p>
                            </div>
                        </div>
                        <span className="text-gray-900 font-bold text-sm">{meal.calo} kcal</span>
                    </div>
                ))}

                <button className="w-full cursor-pointer text-left p-3 border border-dashed border-gray-700 rounded-xl text-gray-400 text-sm hover:border-gray-500 hover:text-gray-300 transition-colors">
                    + Add dinner...
                </button>
            </div>
        </BaseCard>
    );
}