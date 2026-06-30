'use client'

import {WeightLogProps, WeightLogState} from "@/app/types/progress";
import {useActionState, useEffect, useState} from "react";
import {logWeight} from "@/app/(calofit)/progress/actions";
import {submitProfileData} from "@/app/(calofit)/onboarding/actions";

const INITIAL_STATE: WeightLogState = { status: 'idle' };

export default function WeightLogModal ({isOpen, onClose, onSuccess, profile}: WeightLogProps) {
    const [state, formAction, isPending] = useActionState(logWeight as any, INITIAL_STATE);
    const [actionState, formMissingAction, isSubmitting] = useActionState(
        submitProfileData,
        INITIAL_STATE,
    );
    const [today, setToday] = useState('');
    const isMissingTargetWeight = profile?.targetWeight === null;
    const isMissingCurrentWeight = !profile?.currentWeight;
    const isSetupMode = isMissingTargetWeight || isMissingCurrentWeight;
    useEffect(() => {
        setToday(new Date().toISOString().split('T')[0]);
    }, []);

    useEffect(() => {
        if (state.status === 'success') {
            if (onSuccess) onSuccess();
            onClose();
        }
    }, [state.status, onSuccess, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h3 className="text-xl font-semibold">
                        {isSetupMode ? "Hoàn thiện hồ sơ" : "Ghi nhận cân nặng"}
                    </h3>

                    {!isSetupMode && (
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {isMissingTargetWeight ? (
                    <form action={formMissingAction} className="p-5">
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl mb-4">
                            <label htmlFor="targetWeight" className="block text-sm font-medium text-blue-800 mb-1">
                                Mục tiêu cân nặng (kg) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="targetWeight"
                                name="targetWeight"
                                step="0.1"
                                min="30"
                                max="300"
                                required // Bắt buộc nhập nếu đang thiếu
                                placeholder="Ví dụ: 60.0"
                                className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800"
                            />
                            <p className="text-xs text-blue-600 mt-2">
                                Hệ thống cần mục tiêu của bạn để tính toán lộ trình phù hợp.
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang lưu...
                                </span>
                            ) : (
                                "Lưu thay đổi"
                            )}
                        </button>
                    </form>
                ) : (
                    <form action={formAction} className="p-5">
                        {state.status === 'error' && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                {state.message}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="loggedDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày ghi nhận
                                </label>
                                <input
                                    type="date"
                                    id="loggedDate"
                                    name="loggedDate"
                                    defaultValue={today}
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-800"
                                />
                            </div>

                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                                    Cân nặng hiện tại (kg)
                                </label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    step="0.1"
                                    min="30"
                                    max="300"
                                    required
                                    placeholder="Ví dụ: 65.5"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-800"
                                />
                            </div>

                            <div>
                                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ghi chú (Tùy chọn)
                                </label>
                                <textarea
                                    id="note"
                                    name="note"
                                    rows={2}
                                    placeholder="Hôm nay tập nặng, ăn gian một xíu..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-800 resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 justify-end">
                            {!isSetupMode && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-xl"
                                >
                                    Hủy
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang lưu...
                                    </span>
                                ) : (
                                    "Lưu thay đổi"
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}