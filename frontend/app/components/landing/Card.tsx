import {CardProps} from "@/app/types/landing";

export default function Card ({number, title, description, icon}: CardProps) {
    return (
        <div className="flex flex-col md:flex-row gap-8 py-3 items-center justify-between">
            <div className="flex flex-col items-start gap-4 w-full md:w-3/5">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white font-bold text-lg shadow-sm">
                        {number}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {title}
                    </h3>
                </div>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="w-full md:w-2/5 flex justify-end">
                {/*
                   <img src={icon} alt={title} className="w-full md:w-[320px] h-auto object-cover rounded-2xl shadow-sm" />
                */}
                <div className="w-full md:w-[320px] h-[200px] bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 shadow-sm transition-all hover:shadow-md">
                    {icon}
                </div>
            </div>
        </div>
    )
}