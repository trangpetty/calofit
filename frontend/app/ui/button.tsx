import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                'w-full font-bold py-4 rounded-xl transition-colors',
                className,
            )}
        >
            {children}
        </button>
    );
}