// app/onboarding/components/StepRenderer.tsx
'use client';

import { StepConfig, StepErrors, FormDataState, ProfileFormData } from '@/types/onboarding';

interface Props {
    config:   StepConfig;
    data:     FormDataState;
    errors:   StepErrors;
    onChange: (field: keyof ProfileFormData, value: string | number) => void;
}

export function StepRenderer({ config, data, errors, onChange }: Props) {
    const widthStep = "500px";
    const heightStep = "440px";

    return (
        <div className="space-y-6" style={{ width: widthStep, height: heightStep }}>
            <h2 className="text-2xl font-bold text-gray-800 text-center">
                {config.title}
            </h2>

            {config.fields.map((field) => {
                const value = data[field.name];
                const error = errors[field.name];

                return (
                    <div key={field.name}>
                        {/* Hidden input để FormData có giá trị khi submit */}
                        <input type="hidden" name={field.name} value={value?.toString() ?? ''} />

                        {field.label && (
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {field.label}
                            </label>
                        )}

                        {/* ── number-input ── */}
                        {field.type === 'number-input' && (
                            <input
                                type="number"
                                placeholder={field.placeholder}
                                step={field.step}
                                value={value?.toString() ?? ''}
                                onChange={(e) =>
                                    onChange(field.name, e.target.value ? Number(e.target.value) : '')
                                }
                                className={`w-full p-3 border text-gray-900 bg-transparent rounded-xl outline-none transition-all ${
                                    error
                                        ? 'border-red-500 ring-1 ring-red-500'
                                        : 'border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                                }`}
                            />
                        )}

                        {/* ── card-select (text only, hỗ trợ desc) ── */}
                        {field.type === 'card-select' && (
                            <div className={`grid gap-3 grid-cols-${field.cols ?? 1}`}>
                                {field.options?.map((opt) => (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => onChange(field.name, opt.id)}
                                        className={`p-4 border rounded-xl text-left transition-all ${
                                            value === opt.id
                                                ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20'
                                                : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="font-medium text-gray-800">{opt.label}</div>
                                        {opt.desc && (
                                            <div className="text-sm text-gray-500 mt-1">{opt.desc}</div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* ── icon-select (icon + label, full-width row) ── */}
                        {field.type === 'icon-select' && (
                            <div className="grid gap-3 grid-cols-1">
                                {field.options?.map((opt) => (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => onChange(field.name, opt.id)}
                                        className={`p-5 border rounded-xl flex items-center gap-4 transition-all ${
                                            value === opt.id
                                                ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20'
                                                : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        {opt.icon && <span className="text-3xl">{opt.icon}</span>}
                                        <span className="font-medium text-gray-800 text-lg">{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
