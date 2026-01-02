import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = ({ label, className, ...props }: InputProps) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all uppercase placeholder:normal-case disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
                {...props}
            />
        </div>
    );
};
