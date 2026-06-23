import clsx from 'clsx';
import {CrownIcon} from "@phosphor-icons/react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function ButtonGetPremium({ className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                'bg-yellow-300 text-gray-900 hover:bg-gray-800 hover:text-white rounded-full px-5 py-2 flex items-center gap-2 text-sm tracking-wide font-semibold backdrop-blur-md',
                className,
            )}
        >
            Go Premium
            <CrownIcon size={16} weight="bold" />
        </button>
    );
}