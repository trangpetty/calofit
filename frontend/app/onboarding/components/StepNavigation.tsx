// app/onboarding/components/StepNavigation.tsx

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6" />
    </svg>
);

interface Props {
    currentStep: number;
    totalSteps: number;
    isSubmitting: boolean;
    onPrev: () => void;
    onNext: () => void;
}

export function StepNavigation({
                                   currentStep,
                                   totalSteps,
                                   isSubmitting,
                                   onPrev,
                                   onNext,
                               }: Props) {
    const isLastStep = currentStep === totalSteps;

    return (
        <div className="mt-10 flex gap-3">
            {currentStep > 1 && (
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={isSubmitting}
                    className="flex-1 py-4 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
                >
                    <ChevronLeft /> Quay lại
                </button>
            )}

            <button
                type={isLastStep ? 'submit' : 'button'}
                onClick={isLastStep ? undefined : onNext}
                disabled={isSubmitting}
                className="flex-[2] py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-black flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isLastStep ? (
                    'Hoàn tất'
                ) : (
                    <>
                        Tiếp tục <ChevronRight />
                    </>
                )}
            </button>
        </div>
    );
}
