import {FeatureCardProps} from "@/app/types/landing";

export default function FeatureCard ({ title, description, icon, colorTheme }: FeatureCardProps) {
    const colorClasses = {
        green: "bg-green-100 text-green-700",
        purple: "bg-purple-100 text-purple-700",
        blue: "bg-blue-100 text-blue-700",
        indigo: "bg-indigo-100 text-indigo-700"
    };

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