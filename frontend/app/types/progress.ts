
export interface WeightLogData {
    note: string | '';
    weight: number | '';
    loggedDate: string | null;
}

export type FormDataState = Partial<WeightLogData>;

export interface WeightLogState {
    status: 'idle' | 'success' | 'error';
    message?: string;
    data?: any;
}

export interface GoalProgressResult {
    startWeight: number;
    currentWeight: number;
    targetWeight: number;
    progressPercent: number;
    weeklyActual: number;
    weeklyTarget: number;
    projectedDate: string;
    weeksRemaining: number;
    goalType: string;
    bmiCategory: string;
    bmt: number;
    projectedFast: string;
    projectedSlow: string;
}