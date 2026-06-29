import {ReactNode} from "react";

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
    colorTheme: string;
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