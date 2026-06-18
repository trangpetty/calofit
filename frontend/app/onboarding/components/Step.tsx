import {StepContainer} from "@/app/components/onboarding/StepContainer";

export const Step = ({data, onChange}: any) => (
    <StepContainer>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Thông tin cơ bản</h2>
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                <div className="grid grid-cols-2 gap-4">
                    {['MALE', 'FEMALE'].map((g) => (
                        <button key={g} onClick={() => onChange('gender', g)} className={`p-4 border rounded-xl ${data.gender === g ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
                            {g === 'MALE' ? 'Nam' : 'Nữ'}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </StepContainer>
)