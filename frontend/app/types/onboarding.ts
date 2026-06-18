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

export type StepType = 'GENDER' | 'BODY' | 'ACTIVITY' | 'GOAL';

export interface StepConfig {
    id: StepType;
    title: string;
    component: React.ReactNode;
}
