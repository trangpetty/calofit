import {ReviewCardProps} from "@/app/types/landing";
import {StarIcon} from "@phosphor-icons/react";

export  default function ReviewCard ({ quote, initials, name, location, avatarColor }: ReviewCardProps) {
    return (
        <div className="bg-[#27272a] border border-[#3f3f46] rounded-2xl p-6 md:p-8 flex flex-col h-full">

            {/* 5 Ngôi sao (Màu cam/vàng) */}
            <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={20} weight="fill" className="text-orange-400" />
                ))}
            </div>

            {/* Nội dung Review (flex-grow đẩy phần avatar xuống đáy nếu text ngắn) */}
            <p className="text-white font-medium leading-relaxed text-lg mb-8 flex-grow">
                {quote}
            </p>

            {/* Footer: Avatar & Thông tin */}
            <div className="flex items-center gap-4">
                {/* Avatar tự tạo bằng chữ cái */}
                <div className={`w-12 h-12 rounded-full flex shrink-0 items-center justify-center font-bold text-gray-900 ${avatarColor}`}>
                    {initials}
                </div>

                {/* Tên & Vị trí/Gói */}
                <div className="flex flex-col">
                    <span className="text-white font-bold">{name}</span>
                    <span className="text-zinc-400 text-sm">{location}</span>
                </div>
            </div>

        </div>
    )
}