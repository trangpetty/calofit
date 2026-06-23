'use client';

import BaseCard from "@/app/(calofit)/dashboard/components/(cards)/base_card";
import { CheckCircle, Circle } from "@phosphor-icons/react";
import {Exercise} from "@/app/types/dashboard";

export default function WorkoutCard() {
    const exercises: Exercise[] = [
        { id: '1', order: 1, name: 'Deadlift', sets: '4×6', weight: '80kg', targetMuscle: 'Lưng', status: 'done' },
        { id: '2', order: 2, name: 'Pull-up', sets: '3×8', targetMuscle: 'Lưng', status: 'done' },
        { id: '3', order: 3, name: 'Seated row', sets: 'tiếp theo', targetMuscle: '', status: 'next' }
    ];

    const completed = exercises.filter(ex => ex.status === 'done').length;
    const total = 6;
    const progress = (completed / total) * 100;

    return (
        <BaseCard title="Lịch tập" badge="Free">
            {/* Progress bar */}
            <div className="mb-4">
                <div className="flex justify-end mb-1 text-emerald-500 text-xs font-bold">
                    {completed}/{total}
                </div>
                <div className="w-full h-1.5 bg-gray-700 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* List workouts */}
            <div className="flex flex-col gap-2">
                {exercises.map((ex) => (
                    <div
                        key={ex.id}
                        className={`flex items-center justify-between p-2.5 ${
                            ex.status === 'next' ? 'bg-emerald-100 rounded-lg text-[#1a5d36]' :  'border-b border-b-gray-600 text-gray-900'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {ex.status === 'done' ? (
                                <CheckCircle size={22} weight="fill" className="text-emerald-500" />
                            ) : (
                                <Circle size={22} weight="regular" className="text-emerald-600" />
                            )}

                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <span className={`px-3 py-1 font-base rounded-lg ${ex.status === 'done' ? 'bg-emerald-200 text-emerald-600' : ''}`}>{ex.order}</span>
                                <span>{ex.name}</span>
                                {ex.sets && <span className={ex.status === 'done' ? 'text-gray-400 font-normal' : 'font-normal'}>· {ex.sets}</span>}
                                {ex.weight && <span className={ex.status === 'done' ? 'text-gray-400 font-normal' : 'font-normal'}>· {ex.weight}</span>}
                            </div>
                        </div>

                        {/* Tag muscle */}
                        {ex.targetMuscle && (
                            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-md">
                                {ex.targetMuscle}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </BaseCard>
    );
}