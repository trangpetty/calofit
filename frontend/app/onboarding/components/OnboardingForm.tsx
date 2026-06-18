'use client';

// app/onboarding/components/OnboardingForm.tsx

import { useActionState, useState, startTransition, useEffect } from 'react';
import {getProfile, submitProfileData} from '../actions';
import { ProfileFormData, OnboardingState, StepErrors, FormDataState } from '../../types/onboarding';
import { STEPS } from '../steps.config';
import { StepRenderer }  from './StepRenderer';
import { StepNavigation } from './StepNavigation';
import { SuccessScreen }  from './SuccessScreen';

// ── Validation tự động từ config ──────────────────────────────────────────────

function validateStep(stepIndex: number, data: FormDataState): StepErrors {
    const errors: StepErrors = {};
    const fields = STEPS[stepIndex].fields;

    for (const field of fields) {
        const val = data[field.name];

        if (field.type === 'number-input') {
            const num = Number(val);
            if (!val && val !== 0) {
                errors[field.name] = `Vui lòng nhập ${field.label.toLowerCase()}`;
            } else if (field.name === 'age'    && (num < 12  || num > 100)) errors.age    = 'Tuổi phải từ 12 đến 100';
            else if (field.name === 'height'   && (num < 100 || num > 250)) errors.height = 'Chiều cao không hợp lệ';
            else if (field.name === 'weight'   && (num < 30  || num > 300)) errors.weight = 'Cân nặng không hợp lệ';
        }

        if ((field.type === 'card-select' || field.type === 'icon-select') && !val) {
            errors[field.name] = `Vui lòng chọn ${field.label || 'một lựa chọn'}`;
        }
    }

    return errors;
}

// ── Component ─────────────────────────────────────────────────────────────────

const INITIAL_STATE: OnboardingState = { status: 'idle' };

export default function OnboardingForm() {
    const [actionState, formAction, isSubmitting] = useActionState(
        submitProfileData,
        INITIAL_STATE,
    );

    const [currentStep, setCurrentStep] = useState(0); // 0-indexed
    const [errors, setErrors]           = useState<StepErrors>({});
    const [formData, setFormData]       = useState<FormDataState>({});

    const totalSteps = STEPS.length;

    const handleChange = (field: keyof ProfileFormData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const goNext = () => {
        const stepErrors = validateStep(currentStep, formData);
        if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
        setErrors({});
        setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
    };

    const goPrev = () => {
        setErrors({});
        setCurrentStep((s) => Math.max(s - 1, 0));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // QUAN TRỌNG: Chặn hành vi submit tự động của trình duyệt sinh ra FormData thiếu

        const stepErrors = validateStep(currentStep, formData);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        // Lấy toàn bộ dữ liệu từ State (không sợ bị mất khi chuyển bước) và ép kiểu số
        const payloadToSubmit = {
            ...formData,
            age: Number(formData.age),
            height: Number(formData.height),
            weight: Number(formData.weight)
        };

        // Nhồi payload thủ công xuống Server Action
        startTransition(() => {
            formAction(payloadToSubmit as any);
        });
    };

    const isSuccess = actionState.status === 'success';

    useEffect(() => {
        async function fetchProfile() {
            const profile = await getProfile();
            console.log("profile: ", profile)
        }
        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}} />

            <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden">

                {!isSuccess && (
                    <div className="h-1.5 w-full bg-gray-100">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                        />
                    </div>
                )}

                <div className="p-8">
                    {isSuccess ? (
                        <SuccessScreen data={actionState.data} />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="min-h-[340px]">
                               <StepRenderer
                                    config={STEPS[currentStep]}
                                    data={formData}
                                    errors={errors}
                                    onChange={handleChange}
                                />
                            </div>

                            {actionState.status === 'error' && (
                                <p className="text-red-500 text-sm text-center mt-4">
                                    {actionState.message}
                                </p>
                            )}

                            <StepNavigation
                                currentStep={currentStep + 1}
                                totalSteps={totalSteps}
                                isSubmitting={isSubmitting}
                                onPrev={goPrev}
                                onNext={goNext}
                            />
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
