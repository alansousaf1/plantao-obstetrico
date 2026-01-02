import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
    icon?: LucideIcon;
    iconSize?: number;
    isLoading?: boolean;
}

export const Button = ({
    children, variant = 'primary', icon: Icon, iconSize = 16, isLoading, className, disabled, ...props
}: ButtonProps) => {
    const base = "px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 border border-transparent",
        secondary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 border border-transparent",
        outline: "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm",
        ghost: "bg-transparent hover:bg-slate-100/50 text-slate-500",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20",
        success: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : Icon ? (
                <Icon size={iconSize} className={children ? '' : ''} />
            ) : null}
            {children}
        </button>
    );
};
