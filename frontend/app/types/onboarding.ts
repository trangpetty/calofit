export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type ActivityLevel = 'SEDENTARY' | 'LIGHTLY_ACTIVE' | 'MODERATELY_ACTIVE' | 'VERY_ACTIVE' | 'EXTRA_ACTIVE';
export type Goal = 'LOSE_WEIGHT' | 'MAINTAIN_WEIGHT' | 'GAIN_MUSCLE';

export interface ProfileFormData {
    name: string | '';
    gender: Gender | '';
    age: number | '';
    height: number | '';
    weight: number | '';
    activityLevel: ActivityLevel | '';
    goal: Goal | '';
    targetWeight?: number;
    weeklyGoalRate?: number;
    startDate?: string;
}

export interface ProfileResult {
    dailyCaloriesGoal: number;
    proteinTarget:     number;
    carbsTarget:       number;
    fatTarget:         number;
    tdee:              number;
    weight:            number;
}

export type StepErrors    = Partial<Record<keyof ProfileFormData, string>>;
export type FormDataState = Partial<ProfileFormData>;

export interface OnboardingState {
    status: 'idle' | 'success' | 'error';
    message?: string;
    data?: any;
}
// ── Config types ──────────────────────────────────────────────────────────────

export type FieldType = 'number-input' | 'card-select' | 'icon-select' | 'text-input' | 'radio-select' | 'date';

export interface OptionItem {
    id:    string;
    label: string;
    desc?: string;   // dùng cho card-select
    icon?: string;   // dùng cho icon-select
}

export interface StepField {
    name:        keyof ProfileFormData;
    label?:       string;
    subLabel?:   string;
    type:        FieldType;
    innerLabel?: string;
    placeholder?: string;
    step?:        number;              // cho input[type=number]
    unit?:        string;
    options?:    OptionItem[];         // cho card-select / icon-select
    cols?:       1 | 2 | 3;           // số cột grid (mặc định 1)
}

export interface StepConfig {
    title:  string;
    subTitle?: string;
    fields: StepField[];
    bottomTitle?: string;
}
