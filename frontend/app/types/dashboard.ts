import {ReactNode} from "react";

export type ThemColor = 'green' | 'blue' | 'orange' | 'cyan' | 'purple';
export type DayStatus = 'done' | 'current' | 'future';

export interface MetricCardProps {
    title: string;
    icon?: ReactNode;
    mainValue: string | ReactNode;
    subValue: string;
    progressPercentage?: number;
    footerText?: string;
    themeColor?: ThemColor;
    footerColor?: string;
}

export interface BaseCardProps {
    icon?: ReactNode;
    title: string;
    badge?: 'Free' | 'Premium';
    actionText?: string;
    onActionClick?: () => void;
    children: ReactNode;
    isLocked?: boolean;
    classNameBlur?: string;
    classNameCard?: string;
}

export interface MacroData {
    current: number;
    max: number;
}

export interface MacrosCardProps {
    calo?: MacroData
    protein?: MacroData;
    carbs?: MacroData;
    fat?: MacroData;
}

export interface Meal {
    id: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    name: string;
    foods: string;
    calo: number;
}

export interface Exercise {
    id: string;
    order: number;
    name: string;
    sets: string;
    weight?: string;
    targetMuscle: string;
    status: 'done' | 'next' | 'pending';
}

export interface GoalProgressProps {
    currentWeight?: number;
    targetWeight?: number | null;
    progressPercent?: number;
}

export interface StreakDay {
    label: string;
    status: DayStatus;
}

