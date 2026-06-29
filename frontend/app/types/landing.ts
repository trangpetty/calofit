import {ReactNode} from "react";

export const colorClasses = {
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    blue: "bg-blue-100 text-blue-700",
    indigo: "bg-indigo-100 text-indigo-700"
};

export interface CardProps {
    number: number;
    title: string;
    description: string;
    icon: ReactNode;
}

export interface FeatureCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    colorTheme: keyof typeof colorClasses;
}

export interface ReviewCardProps {
    quote: string;
    initials: string;
    name: string;
    location: string;
    avatarColor: string;
}

export interface PricingCardProps {
    title: string;
    titleColor: string;
    price: string;
    duration: string;
    description: string;
    features: {text: string; included: boolean;}[];
    buttonText: string;
    buttonIcon: ReactNode;
    buttonClasses: string;
    isPopular: boolean;
    borderColor: string;
    link: string;
}

export interface FaqItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: (() => void);
}