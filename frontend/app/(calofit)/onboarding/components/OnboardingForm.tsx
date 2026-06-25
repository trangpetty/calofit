'use client';

import { useActionState, useState, startTransition, useEffect } from 'react';
import {getProfile, submitProfileData} from '../actions';
import {ProfileFormData, OnboardingState, StepErrors, FormDataState, ProfileResult} from '@/app/types/onboarding';
import { STEPS } from '../steps.config';
import { StepRenderer }  from './StepRenderer';
import { StepNavigation } from './StepNavigation';
import { SuccessScreen }  from './SuccessScreen';
import {AuthStep} from "@/app/(calofit)/onboarding/components/AuthStep";

function validateStep(stepIndex: number, data: FormDataState): StepErrors {
    const errors: StepErrors = {};
    const fields = STEPS[stepIndex].fields;

    for (const field of fields) {
        const val = data[field.name as keyof typeof data];

        if (field.type === 'number-input') {
            const num = Number(val);
            if (!val && val !== 0) {
                errors[field.name as keyof ProfileFormData] = `Please enter ${field.label?.toLowerCase() ?? 'this field'}`;            } else if (field.name === 'age'    && (num < 12  || num > 100)) errors.age    = 'Tuổi phải từ 12 đến 100';
            else if (field.name === 'height'   && (num < 100 || num > 250)) errors.height = 'Chiều cao không hợp lệ';
            else if (field.name === 'weight'   && (num < 30  || num > 300)) errors.weight = 'Cân nặng không hợp lệ';
        }

        if ((field.type === 'card-select' || field.type === 'icon-select') && !val) {
            errors[field.name as keyof ProfileFormData] = `Vui lòng chọn ${field.label || 'một lựa chọn'}`;
        }
    }

    return errors;
}

// ── Component ─────────────────────────────────────────────────────────────────

const INITIAL_STATE: OnboardingState = { status: 'idle' };

export default function OnboardingForm({isLoggedIn = false}: {isLoggedIn?: boolean}) {
    const [actionState, formAction, isSubmitting] = useActionState(
        submitProfileData,
        INITIAL_STATE,
    );

    const [currentStep, setCurrentStep] = useState(0); // 0-indexed
    const [errors, setErrors]           = useState<StepErrors>({});
    const [formData, setFormData]       = useState<FormDataState>({});
    const [showAuthStep, setShowAuthStep] = useState(false);

    const totalSteps = STEPS.length;

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        const errorKey = field as keyof StepErrors;
        if (errors[errorKey]) {
            setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
        }
    };

    const goNext = () => {
        const stepErrors = validateStep(currentStep, formData);
        if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
        setErrors({});
        if (currentStep === totalSteps - 1) {
            const payloadToSubmit = {
                ...formData,
                age: Number(formData.age),
                height: Number(formData.height),
                weight: Number(formData.weight)
            };

            if(!isLoggedIn) {
                localStorage.setItem('pendingOnboardingData', JSON.stringify(payloadToSubmit));
                setShowAuthStep(true);
                return;
            } else {
                startTransition(() => {
                    formAction(payloadToSubmit as any);
                });
            }
        } else {
            setCurrentStep((s) => s  + 1);
        }
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

    };

    const handleAuthSuccess = () => {
        const pendingData = localStorage.getItem('pendingOnboardingData');
        if (pendingData) {
            const parsedData = JSON.parse(pendingData);
            startTransition(() => {
                formAction(parsedData as any);
            });
            localStorage.removeItem('pendingOnboardingData');
        }
        setShowAuthStep(false);
    };

    const [profile, setProfile] = useState<ProfileResult | null>(null);

    useEffect(() => {
        if (!isLoggedIn) return;

        const pendingData = localStorage.getItem('pendingOnboardingData');

        if (pendingData) {
            handleAuthSuccess();
        } else {
            async function fetchProfile() {
                try {
                    const res = await getProfile();
                    if (res?.status === 'success') {
                        setProfile(res.data as ProfileResult);
                    }
                } catch (error) {
                    console.error("Lỗi khi fetch profile:", error);
                }
            }
            fetchProfile();
        }
    }, [isLoggedIn]);
    const isSuccess = actionState.status === 'success';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden">
                {(isSuccess || profile) ? (
                    <SuccessScreen
                        data={actionState.status === 'success' ? actionState.data : (profile as ProfileResult)}
                    />              ) : (
                    <div>
                        <div className="h-1.5 w-full bg-gray-100">
                            <div
                                className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                                style={{ width: showAuthStep ? '100%' : `${((currentStep + 1) / (totalSteps + 1) * 100)}%` }}
                            />
                        </div>

                        <div className="p-8">
                            {showAuthStep ? (
                                <AuthStep
                                    onBack={() => setShowAuthStep(false)}
                                    onSuccess={handleAuthSuccess}
                                />
                            ) : (

                                <form onSubmit={((e) => {
                                    e.preventDefault();
                                    goNext();
                                })}>
                                    <div className="min-h-[340px]">
                                       <StepRenderer
                                            config={STEPS[currentStep]}
                                            data={formData}
                                            errors={errors}
                                            onChange={handleChange as any}
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
                )}
            </div>
        </div>
    );
}
