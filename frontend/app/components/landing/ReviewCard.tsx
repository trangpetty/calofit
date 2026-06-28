import {ReviewCardProps} from "@/app/types/landing";
import {StarIcon} from "@phosphor-icons/react";

export  default function ReviewCard ({ quote, initials, name, location, avatarColor }: ReviewCardProps) {
    return (
        <div className="bg-white border shadow-lg rounded-2xl p-6 md:p-8 flex flex-col h-full">

            <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={20} weight="fill" className="text-orange-400" />
                ))}
            </div>

            <p className="text-gray-900 font-medium leading-relaxed text-lg mb-8 flex-grow">
                {quote}
            </p>

            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex shrink-0 items-center justify-center font-bold text-gray-900 ${avatarColor}`}>
                    {initials}
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-900 font-bold">{name}</span>
                    <span className="text-zinc-400 text-sm">{location}</span>
                </div>
            </div>

        </div>
    )
}