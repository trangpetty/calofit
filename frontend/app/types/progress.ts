
export interface WeightLogData {
    note: string | '';
    weight: number | '';
    loggedDate: string | null;
}

export interface WeightLogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    profile: GoalProgressResult | undefined;
}

export type FormDataState = Partial<WeightLogData>;

export interface State {
    status: 'idle' | 'success' | 'error';
    message?: string;
    data?: any;
}

export interface GoalProgressResult {
    age: number;
    gender: string;
    weight: number;
    height: number;
    activityLevel: string;
    goal: string;
    bmr: number;
    tdee: number;
    dailyCaloriesGoal: number;
    bmi: number;
    proteinTarget: number;
    carbsTarget: number;
    fatTarget: number;
    startWeight: number,
    targetWeight: number;
    currentWeight: number;
    weeklyGoalRate: number;
    startDate: number;
}