import {BaseCardProps} from "@/app/types/dashboard";

export default function BaseCard ({
                                    title, badge = 'Free', actionText,
                                    onActionClick, children
                                  }: BaseCardProps) {
    return (
        <div className="rounded-2xl p-4 w-full flex flex-col font-sans shadow-lg gap-4">
            {/* Header card */}
            <div className="flex items-center gap-3">
                <h3 className="text-gray-900 font-bold text-base">{title}</h3>
                {badge === 'Free' ? (
                    <span className="bg-[#e0f5e9] text-[#1a5d36] text-[10px] font-bold px-2 py-0.5 rounded-md">Free</span>
                ) : (
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-md">Premium</span>
                )}
            </div>

            <div className="flex-1">
                {actionText && (
                    <button
                        onClick={onActionClick}
                        className="text-emerald-600 text-sm font-semibold float-end hover:text-emerald-500 transition-colors mb-4"
                    >
                        {actionText}
                    </button>
                )}
                {children}
            </div>
        </div>
    )
}