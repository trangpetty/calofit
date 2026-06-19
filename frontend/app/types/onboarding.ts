export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type ActivityLevel = 'SEDENTARY' | 'LIGHTLY_ACTIVE' | 'MODERATELY_ACTIVE' | 'VERY_ACTIVE' | 'EXTRA_ACTIVE';
export type Goal = 'LOSE_WEIGHT' | 'MAINTAIN_WEIGHT' | 'GAIN_MUSCLE';

export interface ProfileFormData {
    gender: Gender | '';
    age: number | '';
    height: number | '';
    weight: number | '';
    activityLevel: ActivityLevel | '';
    goal: Goal | '';
}

export interface ProfileResult {
    dailyCaloriesGoal: number;
    proteinTarget:     number;
    carbsTarget:       number;
    fatTarget:         number;
}

export type StepErrors    = Partial<Record<keyof ProfileFormData, string>>;
export type FormDataState = Partial<ProfileFormData>;

export type OnboardingState =
    | { status: 'idle' }
    | { status: 'error';   message: string }
    | { status: 'success'; data: ProfileResult };

// ── Config types ──────────────────────────────────────────────────────────────

export type FieldType = 'number-input' | 'card-select' | 'icon-select';

export interface OptionItem {
    id:    string;
    label: string;
    desc?: string;   // dùng cho card-select
    icon?: string;   // dùng cho icon-select
}

export interface StepField {
    name:        keyof ProfileFormData;
    label:       string;
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
}
