
'use client';

import React, { useState } from 'react';
import { submitProfileData } from '../actions';
import { ProfileFormData } from '@/types/onboarding';
import {StepContainer} from "@/app/components/onboarding/StepContainer";

const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const ChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const CheckCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>;

export default function OnboardingForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successData, setSuccessData] = useState(null);
    const [globalError, setGlobalError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        gender: '', age: '', height: '', weight: '', activityLevel: '', goal: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});

    const handleChange = (field: keyof ProfileFormData, value: any) => {
        setFormData(prev => ({...prev, [field]: value}));
        if (errors[field]) setErrors(prev => ({...prev, [field]: undefined}));
    };

    const validateStep = () => {
        const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.gender) {
                newErrors.gender = 'Vui lòng chọn giới tính';
                isValid = false;
            }
            if (!formData.age || formData.age < 12 || formData.age > 100) {
                newErrors.age = 'Tuổi phải từ 12 đến 100';
                isValid = false;
            }
        } else if (currentStep === 2) {
            if (!formData.height || formData.height < 100 || formData.height > 250) {
                newErrors.height = 'Chiều cao không hợp lệ';
                isValid = false;
            }
            if (!formData.weight || formData.weight < 30 || formData.weight > 300) {
                newErrors.weight = 'Cân nặng không hợp lệ';
                isValid = false;
            }
        } else if (currentStep === 3) {
            if (!formData.activityLevel) {
                newErrors.activityLevel = 'Vui lòng chọn mức độ vận động';
                isValid = false;
            }
        } else if (currentStep === 4) {
            if (!formData.goal) {
                newErrors.goal = 'Vui lòng chọn mục tiêu của bạn';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const nextStep = () => {
        if (validateStep()) setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    };
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

// --- SỬ DỤNG SERVER ACTION Ở ĐÂY ---
    const submitProfile = async () => {
        if (!validateStep()) return;
        setIsSubmitting(true);
        setGlobalError(null);

        try {
            const response = await submitProfileData(formData as ProfileFormData);

            if (response.success) {
                setSuccessData(response.data);
            } else {
                setGlobalError(response.message || "Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            console.error(error);
            setGlobalError("Mạng lỗi, không thể kết nối đến máy chủ.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const widthStep = "500px";
    const heightStep = "420px";
    const renderStep1 = () => (
        <div className="space-y-6" style={{ minWidth: widthStep, minHeight: heightStep }}>
            <h2 className="text-2xl font-bold text-gray-800 text-center">Cho chúng tôi biết về bạn</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính sinh học</label>
                <div className="grid grid-cols-2 gap-4">
                    {['MALE', 'FEMALE'].map((g) => (
                        <button
                            key={g}
                            onClick={() => handleChange('gender', g)}
                            className={`p-4 border rounded-xl text-gray-900 bg-transparent flex items-center justify-center transition-all ${
                                formData.gender === g ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20' : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                            }`}
                        >
                            <span className="font-medium">{g === 'MALE' ? 'Nam' : 'Nữ'}</span>
                        </button>
                    ))}
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tuổi của bạn</label>
                <input
                    type="number"
                    placeholder="Ví dụ: 25"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value ? Number(e.target.value) : '')}
                    className={`w-full p-3 border text-gray-900 bg-transparent rounded-xl outline-none transition-all ${errors.age ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'}`}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6 w-full" style={{ width: widthStep, minHeight: heightStep }}>
            <h2 className="text-2xl font-bold text-gray-800 text-center">Chỉ số cơ thể</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chiều cao (cm)</label>
                <input
                    type="number"
                    placeholder="Ví dụ: 170"
                    value={formData.height}
                    onChange={(e) => handleChange('height', e.target.value ? Number(e.target.value) : '')}
                    className={`w-full p-3 border text-gray-900 bg-transparent rounded-xl outline-none transition-all ${errors.height ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'}`}
                />
                {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cân nặng (kg)</label>
                <input
                    type="number"
                    placeholder="Ví dụ: 65"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => handleChange('weight', e.target.value ? Number(e.target.value) : '')}
                    className={`w-full p-3 border text-gray-900 bg-transparent rounded-xl outline-none transition-all ${errors.weight ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'}`}
                />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
            </div>
        </div>
    );

    const renderStep3 = () => {
        const activities = [
            { id: 'SEDENTARY', label: 'Ít vận động', desc: 'Làm việc văn phòng, không tập thể dục' },
            { id: 'LIGHTLY_ACTIVE', label: 'Vận động nhẹ', desc: 'Tập luyện nhẹ 1-3 ngày/tuần' },
            { id: 'MODERATELY_ACTIVE', label: 'Vận động vừa', desc: 'Tập luyện 3-5 ngày/tuần' },
            { id: 'VERY_ACTIVE', label: 'Vận động nhiều', desc: 'Tập luyện nặng 6-7 ngày/tuần' }
        ];

        return (
            <div className="space-y-4 w-full" style={{ width: widthStep, minHeight: heightStep }}>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Mức độ vận động của bạn?</h2>
                <div className="space-y-3">
                    {activities.map(act => (
                        <div
                            key={act.id}
                            onClick={() => handleChange('activityLevel', act.id)}
                            className={`p-4 border rounded-xl cursor-pointer transition-all ${
                                formData.activityLevel === act.id ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20' : 'border-gray-200 hover:border-emerald-200'
                            }`}
                        >
                            <div className="font-medium text-gray-800">{act.label}</div>
                            <div className="text-sm text-gray-500 mt-1">{act.desc}</div>
                        </div>
                    ))}
                </div>
                {errors.activityLevel && <p className="text-red-500 text-sm mt-1 text-center">{errors.activityLevel}</p>}
            </div>
        );
    };

    const renderStep4 = () => {
        const goals = [
            { id: 'LOSE_WEIGHT', label: 'Giảm Cân', icon: '🔥' },
            { id: 'MAINTAIN_WEIGHT', label: 'Giữ Dáng', icon: '⚖️' },
            { id: 'GAIN_MUSCLE', label: 'Tăng Cơ / Tăng Cân', icon: '💪' }
        ];

        return (
            <div className="space-y-6" style={{ width: widthStep, minHeight: heightStep }}>
                <h2 className="text-2xl font-bold text-gray-800 text-center">Mục tiêu của bạn là gì?</h2>
                <div className="grid grid-cols-1 gap-3">
                    {goals.map(g => (
                        <div
                            key={g.id}
                            onClick={() => handleChange('goal', g.id)}
                            className={`p-5 border rounded-xl cursor-pointer flex items-center space-x-4 transition-all ${
                                formData.goal === g.id ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20' : 'border-gray-200 hover:border-emerald-200'
                            }`}
                        >
                            <div className="text-3xl">{g.icon}</div>
                            <div className="font-medium text-gray-800 text-lg">{g.label}</div>
                        </div>
                    ))}
                </div>
                {errors.goal && <p className="text-red-500 text-sm mt-1 text-center">{errors.goal}</p>}
            </div>
        );
    };

    const renderSuccess = () => (
        <div className="flex flex-col h-full justify-center text-center animate-fade-in-up" style={{ width: widthStep, minHeight: heightStep }}>
            <div className="flex justify-center mb-4"><CheckCircle /></div>
            <h2 className="text-3xl font-bold text-gray-800">Hồ sơ hoàn tất!</h2>
            <p className="text-gray-500 mb-6">Chúng tôi đã thiết kế kế hoạch dinh dưỡng riêng cho bạn.</p>

            <div className="bg-emerald-50 p-6 rounded-2xl text-left space-y-4">
                <div className="flex justify-between items-center border-b border-emerald-100 pb-3">
                    <span className="text-emerald-800 font-medium">Mục tiêu Calo hằng ngày</span>
                    <span className="text-2xl font-bold text-emerald-600">{successData.dailyCaloriesGoal} <span className="text-sm font-normal">kcal</span></span>
                </div>

                <div>
                    <span className="text-sm font-medium text-gray-600 block mb-2">Phân bổ chất dinh dưỡng (Macros)</span>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white p-3 rounded-lg text-center border border-gray-100 shadow-sm">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Đạm</div>
                            <div className="font-bold text-blue-600">{successData.proteinTarget}g</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg text-center border border-gray-100 shadow-sm">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tinh bột</div>
                            <div className="font-bold text-amber-600">{successData.carbsTarget}g</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg text-center border border-gray-100 shadow-sm">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Chất béo</div>
                            <div className="font-bold text-rose-500">{successData.fatTarget}g</div>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={() => window.location.href = '/dashboard'} className="w-full bg-emerald-600 text-white font-medium py-4 rounded-xl mt-auto hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                Bắt đầu theo dõi hành trình
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}} />

            <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Progress Bar (Hide if success) */}
                {!successData && (
                    <div className="h-1.5 w-full bg-gray-100">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        />
                    </div>
                )}

                <div className="p-8">
                    {successData ? renderSuccess() : (
                        <>
                            {/* Form Nội dung chính */}
                            <div className="min-h-[300px]">
                                {currentStep === 1 && renderStep1()}
                                {currentStep === 2 && renderStep2()}
                                {currentStep === 3 && renderStep3()}
                                {currentStep === 4 && renderStep4()}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="mt-10 flex gap-3">
                                {currentStep > 1 && (
                                    <button
                                        onClick={prevStep}
                                        disabled={isSubmitting}
                                        className="flex-1 py-4 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors disabled:opacity-50"
                                    >
                                        <ChevronLeft /> Quay lại
                                    </button>
                                )}

                                <button
                                    onClick={currentStep === totalSteps ? submitProfile : nextStep}
                                    disabled={isSubmitting}
                                    className="flex-[2] py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-black flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : currentStep === totalSteps ? 'Hoàn tất' : (
                                        <>Tiếp tục <ChevronRight /></>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}