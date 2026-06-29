import {colorClasses, FeatureCardProps} from "@/app/types/landing";

export default function FeatureCard ({ title, description, icon, colorTheme}: FeatureCardProps) {

    return (
        <div className="flex flex-col items-start gap-4 p-6 bg-white  rounded-3xl transition-all border border-transparent shadow-lg">
            <div className={`p-4 rounded-2xl ${colorClasses[colorTheme]}`}>
                {icon}
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}