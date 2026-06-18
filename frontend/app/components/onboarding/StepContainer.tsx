export const StepContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full h-full flex flex-col justify-start animate-fade-in-up">
        {children}
    </div>
);