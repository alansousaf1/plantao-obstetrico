import type { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const TextArea = ({ label, className, ...props }: TextAreaProps) => {
    return (
        <div className="w-full h-full flex flex-col">
            {label && (
                <label className="block text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <textarea
                className={`w-full h-full min-h-[100px] px-3 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none leading-relaxed placeholder:text-slate-300 ${className}`}
                {...props}
            />
        </div>
    );
};
