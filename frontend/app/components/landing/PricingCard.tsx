import {PricingCardProps} from "@/app/types/landing";
import {CheckIcon} from "lucide-react";
import {XIcon} from "@phosphor-icons/react";

export default function PricingCard({
                         title, titleColor, price, duration, description,
                         features, buttonText, buttonIcon, buttonClasses,
                         isPopular, borderColor
                     }: PricingCardProps) {
    return (
        <div className={`relative bg-white shadow-lg rounded-2xl p-6 md:p-8 flex flex-col h-full border-2 transition-transform hover:-translate-y-1 ${borderColor}`}>

            {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#8b5cf6] text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Phổ biến nhất
                </div>
            )}

            <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${titleColor}`}>{title}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-gray-900 text-4xl md:text-5xl font-bold">{price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{duration}</p>
                <p className="text-gray-500 font-medium">{description}</p>
            </div>

            <hr className="border-[#3f3f46] mb-6" />

            <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                            <CheckIcon size={20} className="text-emerald-500 shrink-0 mt-0.5 font-bold" />
                        ) : (
                            <XIcon size={20} weight="bold" className="text-gray-500 shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-gray-900" : "text-gray-400"}>
                            {feature.text}
                        </span>
                    </li>
                ))}
            </ul>

            <button className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${buttonClasses}`}>
                {buttonIcon}
                {buttonText}
            </button>
        </div>
    );
};